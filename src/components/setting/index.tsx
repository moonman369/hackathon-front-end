/* eslint-disable @next/next/no-img-element */
"use client";

import { get_user_by_address_abi, set_user_uri_abi } from "@/abi/user";
import {
    getPreviewImage,
    uploadFileToPinata,
    uploadJSONToPinata,
} from "@/utils";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
    Address,
    useAccount,
    useContractRead,
    useContractWrite,
    useNetwork,
    usePrepareContractWrite,
} from "wagmi";
import { create } from "zustand";
import ErrorModal from "../modals/error";
import SuccessModal from "../modals/success";
import LoadingModal from "../modals/loader";

type State = {
    profile: string | null;
    profileFile: File | null;
    banner: string | null;
    bannerFile: File | null;
    personalWebsite: string | null;
    linkedin: string | null;
    github: string | null;
    twitter: string | null;
    name: string | null;
    email: string | null;
    bio: string | null;
    url: string | null;
};

type Actions = {
    changeProfile: (profile: string | null) => void;
    changeProfileFile: (profileFile: File | null) => void;
    changeBanner: (banner: string | null) => void;
    changeBannerFile: (bannerFile: File | null) => void;
    changePersonalWebsite: (personalWebsite: string | null) => void;
    changeLinkedin: (linkedin: string | null) => void;
    changeGithub: (github: string | null) => void;
    changeTwitter: (twitter: string | null) => void;
    changeName: (name: string) => void;
    changeEmail: (email: string) => void;
    changeBio: (bio: string) => void;
    changeUrl: (url: string) => void;
};

const useSettingStore = create<State & Actions>((set) => ({
    profile: "",
    profileFile: null,
    banner: "",
    bannerFile: null,
    personalWebsite: "",
    linkedin: "",
    github: "",
    twitter: "",
    name: "",
    email: "",
    bio: "",
    url: "",
    changeProfile: (profile: string | null) =>
        set((state: State) => ({ ...state, profile })),
    changeProfileFile: (profileFile: File | null) =>
        set((state: State) => ({ ...state, profileFile })),
    changeBanner: (banner: string | null) =>
        set((state: State) => ({ ...state, banner })),
    changeBannerFile: (bannerFile: File | null) =>
        set((state: State) => ({ ...state, bannerFile })),
    changePersonalWebsite: (personalWebsite: string | null) =>
        set((state: State) => ({ ...state, personalWebsite })),
    changeLinkedin: (linkedin: string | null) =>
        set((state: State) => ({ ...state, linkedin })),
    changeGithub: (github: string | null) =>
        set((state: State) => ({ ...state, github })),
    changeTwitter: (twitter: string | null) =>
        set((state: State) => ({ ...state, twitter })),
    changeName: (name: string) => set((state: State) => ({ ...state, name })),
    changeEmail: (email: string) =>
        set((state: State) => ({ ...state, email })),
    changeBio: (bio: string) => set((state: State) => ({ ...state, bio })),
    changeUrl: (url: string) => set((state: State) => ({ ...state, url })),
}));

const Setting = () => {
    const {
        profile,
        profileFile,
        banner,
        bannerFile,
        personalWebsite,
        linkedin,
        github,
        twitter,
        name,
        email,
        bio,
        url,
        // functions
        changeProfile,
        changeProfileFile,
        changeBanner,
        changeBannerFile,
        changePersonalWebsite,
        changeLinkedin,
        changeGithub,
        changeTwitter,
        changeName,
        changeEmail,
        changeBio,
        changeUrl,
    } = useSettingStore((state) => state);
    const [isDraggingOverProfile, setIsDraggingOverProfile] = useState(false);
    const [isDraggingOverBanner, setIsDraggingOverBanner] = useState(false);
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    const [errorTitle, setErrorTitle] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successTitle, setSuccessTitle] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [loadingTitle, setLoadingTitle] = useState<string>("");
    const [loadingMessage, setLoadingMessage] = useState<string>("");

    const router = useRouter();
    const checkIfUrlGenerated = useRef<boolean>(false);

    /**
     * @get hooks from wagmi
     */
    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();

    /**
     * @config to write set user uri with form data
     */
    const { config: set_user_uri_config } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_STACK3_ADDRESS as Address,
        abi: set_user_uri_abi,
        functionName: "setUserURI",
        chainId: chain?.id,
        args: [url, process.env.NEXT_PUBLIC_HASH_SECRET],
        onError: (error: any) => {
            console.log(error);
            setErrorTitle(error.message);
        },
    });

    const { write: set_user_uri } = useContractWrite({
        ...set_user_uri_config,
        onError(error: Error) {
            console.log(error);
            setLoadingTitle("");
            setLoadingMessage("");
            setSuccessTitle("");
            setSuccessMessage("");
            setErrorTitle(error.message);
        },
        async onSuccess(data) {
            await data.wait();
            await setLoadingTitle("");
            await setLoadingMessage("");
            await setErrorTitle("");
            await setErrorMessage("");
            await setSuccessTitle("Profile updated successfully");

            console.log(data);
        },
    });

    console.log(set_user_uri);

    /**
     * @config to read user data with address
     */
    const { data, error, isError } = useContractRead({
        address: process.env.NEXT_PUBLIC_STACK3_ADDRESS as Address,
        abi: get_user_by_address_abi,
        functionName: "getUserByAddress",
        chainId: chain?.id,
        args: [address],
        onError(error: Error) {
            console.log(error.message);
            setLoadingTitle("");
            setLoadingMessage("");
            setSuccessTitle("");
            setSuccessMessage("");
            setErrorTitle(error.message);
        },
    });

    useEffect(() => {
        if (!isConnected) {
            router.push("/connect-wallet");
        }
    }, [isConnected, router]);

    useEffect(() => {
        if (data) {
            const fetchUserJSON = async () => {
                await axios
                    .get(data?.uri)
                    .then(async (response) => {
                        if (!response?.data) {
                            throw new Error("User not registered");
                        }

                        const {
                            banner: banner_res,
                            bio: bio_res,
                            personalWebsite: personalWebsite_res,
                            linkedin: linkedin_res,
                            github: github_res,
                            twitter: twitter_res,
                            email: email_res,
                            name: name_res,
                            profile: profile_res,
                        } = response?.data;

                        changeProfile(profile_res);
                        changeBanner(banner_res);
                        changePersonalWebsite(personalWebsite_res);
                        changeLinkedin(linkedin_res);
                        changeGithub(github_res);
                        changeTwitter(twitter_res);
                        changeName(name_res);
                        changeEmail(email_res);
                        changeBio(bio_res);
                    })
                    .catch(async (error) => {
                        if (error.message === "User not registered") {
                            await setErrorTitle("User not registered");
                            router.push("/register");
                            console.log(error.message);
                        }
                    });
            };

            fetchUserJSON();
        }
    }, [data]);

    useEffect(() => {
        if (url && checkIfUrlGenerated.current) {
            console.log({
                url,
                set_user_uri,
                checkIfUrlGenerated,
            });
            set_user_uri?.();
            checkIfUrlGenerated.current = false;
        }
    }, [url, set_user_uri, checkIfUrlGenerated]);

    /**
     * @section to handle profile details update
     * @param event
     */
    const onSubmitProfile = async (event: FormEvent) => {
        event.preventDefault();

        console.log({
            profile,
            banner,
            personalWebsite,
            linkedin,
            github,
            twitter,
            name,
            email,
            bio,
        });

        try {
            await setErrorTitle("");
            await setErrorMessage("");
            await setLoadingTitle("Profile details are updating..");
            await setLoadingMessage("Please wait for a few minutes");
            const updated_user = {
                profile,
                banner,
                personalWebsite,
                linkedin,
                github,
                twitter,
                name,
                email,
                bio,
            };

            const updated_url = await uploadJSONToPinata(updated_user);
            changeUrl(updated_url);
            checkIfUrlGenerated.current = true;
        } catch (error) {
            console.log(error);
            await setSuccessTitle("");
            await setSuccessMessage("");
            await setLoadingTitle("");
            await setLoadingMessage("");
            await setErrorTitle(error.message as any);
        }
    };

    const handleDragOverProfile = (event: any) => {
        event.preventDefault();
        setIsDraggingOverProfile(true);
    };

    const handleDragLeaveProfile = () => {
        setIsDraggingOverProfile(false);
    };

    const handleDragOverBanner = (event: any) => {
        event.preventDefault();
        setIsDraggingOverBanner(true);
    };

    const handleDragLeaveBanner = () => {
        setIsDraggingOverBanner(false);
    };

    const handleDropProfile = async (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        try {
            setLoadingTitle("Uploading profile image");
            event.preventDefault();
            setIsDraggingOverProfile(false);
            const file = event.dataTransfer.files[0];
            changeProfileFile(file);
            const profile_url = await uploadFileToPinata(file);
            changeProfile(profile_url);
            setSuccessTitle("Uploaded profile image");
            setLoadingTitle("");
        } catch (error) {
            await setSuccessTitle("");
            await setSuccessMessage("");
            await setLoadingTitle("");
            await setLoadingMessage("");
            await setErrorTitle("Failed to upload profile image");
        }
    };

    const handleDropBanner = async (event: React.DragEvent<HTMLDivElement>) => {
        try {
            setLoadingTitle("Uploading banner image");
            event.preventDefault();
            setIsDraggingOverBanner(false);
            const file = event!.dataTransfer!.files[0];
            changeBannerFile(file);
            const banner_url = await uploadFileToPinata(file);
            changeBanner(banner_url);
            setSuccessTitle("Uploaded banner image");
            setLoadingTitle("");
        } catch (error) {
            await setSuccessTitle("");
            await setSuccessMessage("");
            await setLoadingTitle("");
            await setLoadingMessage("");
            await setErrorTitle("Failed to upload banner image");
        }
    };

    const handleProfileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            setLoadingTitle("Uploading profile image");
            const file = event.target.files?.[0];
            if (file) {
                changeProfileFile(file as File);
                const profile_url = await uploadFileToPinata(file);
                changeProfile(profile_url);
                setSuccessTitle("Uploaded profile image");
            }
            setLoadingTitle("");
        } catch (error) {
            console.log(error);
            await setSuccessTitle("");
            await setSuccessMessage("");
            await setLoadingTitle("");
            await setLoadingMessage("");
            await setErrorTitle("Failed to upload profile image");
        }
    };

    const handleBannerUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            setLoadingTitle("Uploading banner image");
            const file = event.target.files?.[0];
            if (file) {
                changeBannerFile(file as File);
                const banner_url = await uploadFileToPinata(file);
                changeBanner(banner_url);
                setSuccessTitle("Uploaded banner image");
            }
            setLoadingTitle("");
        } catch (error) {
            console.log(error);
            await setSuccessTitle("");
            await setSuccessMessage("");
            await setLoadingTitle("");
            await setLoadingMessage("");
            await setErrorTitle("Failed to upload banner image");
        }
    };

    /**
     * @section to handle personal details update
     * @param event
     */
    const onSubmitPersonal = async (event: FormEvent) => {
        event.preventDefault();

        console.log({
            profile,
            banner,
            personalWebsite,
            linkedin,
            github,
            twitter,
            name,
            email,
            bio,
        });

        try {
            await setErrorTitle("");
            await setErrorMessage("");
            await setLoadingTitle("Personal details are updating..");
            await setLoadingMessage("Please wait for a few minutes");
            const updated_user = {
                profile,
                banner,
                personalWebsite,
                linkedin,
                github,
                twitter,
                name,
                email,
                bio,
            };

            const updated_url = await uploadJSONToPinata(updated_user);
            changeUrl(updated_url);
            console.log(updated_url);
            checkIfUrlGenerated.current = true;
        } catch (error) {
            console.log(error);
            await setSuccessTitle("");
            await setSuccessMessage("");
            await setLoadingTitle("");
            await setLoadingMessage("");
            await setErrorTitle(error.message as any);
        }
    };

    return (
        <div className="bg-gray-100 rounded-xl p-6 lg:p-10 text-white">
            {loadingTitle && (
                <LoadingModal
                    loadingTitle={loadingTitle}
                    loadingMessage={loadingMessage}
                />
            )}
            {errorTitle && (
                <ErrorModal
                    errorTitle={errorTitle}
                    errorMessage={errorMessage}
                    needErrorButtonRight={true}
                    errorButtonRightText="Close"
                />
            )}
            {successTitle && (
                <SuccessModal
                    successTitle={successTitle}
                    successMessage={successMessage}
                    needSuccessButtonRight={true}
                    successButtonRightText="Done"
                />
            )}
            <div className="mb-12">
                <h2 className="m-0 mb-6 text-[28px]">
                    Change Your Profile Details
                </h2>
                <>
                    <div>
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-white">
                                        Profile
                                    </h3>
                                    <p className="mt-[-0.85rem] text-sm text-[#9CA3AF]">
                                        This information will be displayed
                                        publicly so be careful what you share.
                                        It may take longer to update details to
                                        blockchain, please check back later once
                                        updated.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form onSubmit={onSubmitProfile}>
                                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="space-y-6 bg-gray-500 px-4 py-5 sm:p-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-50">
                                                    Profile photo
                                                </label>
                                                <div
                                                    className={`mt-1 flex justify-center rounded-md border-2 border-dashed border-[#6B7280] px-6 pt-5 pb-6
                                                    ${
                                                        isDraggingOverProfile
                                                            ? "border-[#fff]"
                                                            : "border-[#6B7280]"
                                                    }`}
                                                    onDragOver={(event) =>
                                                        handleDragOverProfile(
                                                            event
                                                        )
                                                    }
                                                    onDragLeave={
                                                        handleDragLeaveProfile
                                                    }
                                                    onDrop={(event) =>
                                                        handleDropProfile(event)
                                                    }>
                                                    <div className="space-y-1 text-center">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-[#6B7280]"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                            aria-hidden="true">
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        <div className="flex flex-row justify-center items-center text-sm text-center text-[#6B7280]">
                                                            <label
                                                                htmlFor="profile"
                                                                className="relative flex flex-col items-center justify-center cursor-pointer rounded-md bg-transparent font-medium text-blue focus-within:outline-none focus-within:ring-2">
                                                                <span>
                                                                    Upload a
                                                                    file
                                                                </span>
                                                                <input
                                                                    id="profile"
                                                                    name="profile"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    accept="images/*"
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleProfileUpload(
                                                                            event
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                            <p className="pl-1">
                                                                or drag and drop
                                                            </p>
                                                        </div>
                                                        {profileFile && (
                                                            <p className="text-sm text-[#6B7280]">
                                                                File chosen:{" "}
                                                                <span className="text-[#f1f1f1]">
                                                                    {
                                                                        profileFile?.name
                                                                    }
                                                                </span>
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-[#6B7280]">
                                                            PNG, JPG, GIF up to
                                                            10MB
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-50">
                                                    Cover photo
                                                </label>
                                                <div
                                                    className={`mt-1 flex justify-center rounded-md border-2 border-dashed border-[#6B7280] px-6 pt-5 pb-6
                                                    ${
                                                        isDraggingOverBanner
                                                            ? "border-[#fff]"
                                                            : "border-[#6B7280]"
                                                    }`}
                                                    onDragOver={(event) =>
                                                        handleDragOverBanner(
                                                            event
                                                        )
                                                    }
                                                    onDragLeave={
                                                        handleDragLeaveBanner
                                                    }
                                                    onDrop={(event) =>
                                                        handleDropBanner(event)
                                                    }>
                                                    <div className="space-y-1 text-center">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-[#6B7280]"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                            aria-hidden="true">
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        <div className="flex flex-row justify-center items-center text-sm text-center text-[#6B7280]">
                                                            <label
                                                                htmlFor="banner"
                                                                className="relative flex flex-col items-center justify-center cursor-pointer rounded-md bg-transparent font-medium text-blue focus-within:outline-none focus-within:ring-2">
                                                                <span>
                                                                    Upload a
                                                                    file
                                                                </span>
                                                                <input
                                                                    id="banner"
                                                                    name="banner"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    accept="images/*"
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleBannerUpload(
                                                                            event
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                            <p className="pl-1">
                                                                or drag and drop
                                                            </p>
                                                        </div>
                                                        {bannerFile && (
                                                            <p className="text-sm text-[#6B7280]">
                                                                File chosen:{" "}
                                                                <span className="text-[#f1f1f1]">
                                                                    {
                                                                        bannerFile?.name
                                                                    }
                                                                </span>
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-[#6B7280]">
                                                            PNG, JPG, GIF up to
                                                            10MB
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label
                                                        htmlFor="personalWebsite"
                                                        className="block text-sm font-medium text-white">
                                                        Personal Website
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            onChange={(event) =>
                                                                changePersonalWebsite(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                            defaultValue={
                                                                personalWebsite as string
                                                            }
                                                            type="text"
                                                            name="personalWebsite"
                                                            id="personalWebsite"
                                                            className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                                                            placeholder="https://www.user.domain"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label
                                                        htmlFor="linkedin"
                                                        className="block text-sm font-medium text-white">
                                                        Linkedin
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            onChange={(event) =>
                                                                changeLinkedin(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                            defaultValue={
                                                                linkedin as string
                                                            }
                                                            type="text"
                                                            name="linkedin"
                                                            id="linkedin"
                                                            className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                                                            placeholder="https://www.linkedin.com/username"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label
                                                        htmlFor="github"
                                                        className="block text-sm font-medium text-white">
                                                        Github
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            onChange={(event) =>
                                                                changeGithub(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                            defaultValue={
                                                                github as string
                                                            }
                                                            type="text"
                                                            name="github"
                                                            id="github"
                                                            className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                                                            placeholder={
                                                                "https://github.com/username"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label
                                                        htmlFor="twitter"
                                                        className="block text-sm font-medium text-white">
                                                        Twitter
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            onChange={(event) =>
                                                                changeTwitter(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                            defaultValue={
                                                                twitter as string
                                                            }
                                                            type="text"
                                                            name="twitter"
                                                            id="twitter"
                                                            className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                                                            placeholder={
                                                                "https://twitter.com/username"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col justify-center items-start bg-gray-500 px-4 pb-4 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className="cursor-pointer border-none flex items-center justify-center py-2 rounded-full w-52 bg-blue text-white font-semibold text-[1rem] leading-6">
                                                Update profile details
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                            <div className="border-t border-gray-200" />
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-white">
                                        Personal Information
                                    </h3>
                                    <p className="mt-[-0.85rem] text-sm text-[#9CA3AF]">
                                        Use a permanent address where you can
                                        receive mail.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form onSubmit={onSubmitPersonal}>
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-gray-500 px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-4">
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-white">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        defaultValue={
                                                            name as string
                                                        }
                                                        autoComplete="given-name"
                                                        placeholder="Enter your name"
                                                        className="mt-1 bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                                                        onChange={(event) =>
                                                            changeName(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-4">
                                                    <label
                                                        htmlFor="email-address"
                                                        className="block text-sm font-medium text-white">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        defaultValue={
                                                            email as string
                                                        }
                                                        id="email-address"
                                                        autoComplete="email"
                                                        placeholder="Enter your email address"
                                                        className="mt-1 bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                                                        onChange={(event) =>
                                                            changeEmail(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-4">
                                                    <label
                                                        htmlFor="bio"
                                                        className="block text-sm font-medium text-white">
                                                        Bio
                                                    </label>
                                                    <div className="mt-1">
                                                        <textarea
                                                            rows={4}
                                                            name="comment"
                                                            id="bio"
                                                            defaultValue={
                                                                bio as string
                                                            }
                                                            placeholder="Enter your bio"
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-blue focus:border-blue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue resize-y"
                                                            onChange={(event) =>
                                                                changeBio(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col justify-center items-start bg-gray-500 px-4 pb-4 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className="cursor-pointer border-none flex items-center justify-center py-2 rounded-full w-40 bg-blue text-white font-semibold text-[1rem] leading-6">
                                                Update profile
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default Setting;
