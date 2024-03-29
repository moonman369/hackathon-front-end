/* eslint-disable react/no-children-prop */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef } from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useQuery,
} from 'wagmi';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { create } from 'zustand';

import './editor.css';

import RelatedQuestions from '@/components/relatedQuestions';
import TrendingTags from '@/components/trendingTags';
import TagChip from '@/components/tagChip';
import ContentCard from '@/components/cards/content';
import { get_all_questions_by_id, post_answer_abi } from '@/abi/social';
import { Address, Question } from '@/types';
import { uploadFileToPinata, uploadJSONToPinata } from '@/utils';

type State = {
  answer: string;
  url: string;
};

type Actions = {
  changeAnswer: (answer: string) => void;
  changeUrl: (url: string) => void;
};

const useCountStore = create<State & Actions>((set) => ({
  answer: '',
  url: '',
  changeAnswer: (answer: string) =>
    set((state: State) => ({ ...state, answer })),
  changeUrl: (url: string) => set((state: State) => ({ ...state, url })),
}));

const Question = ({ params }: { params: { id: string } }) => {
  const {
    answer,
    url,
    // functions
    changeAnswer,
    changeUrl,
  } = useCountStore((state) => state);

  const isAnswering = useRef<boolean>(false);

  const {
    data: question,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
    refetch: fetch_question,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_STACK3_ADDRESS as Address,
    abi: get_all_questions_by_id,
    functionName: 'getQuestionById',
    args: [params?.id],
    enabled: false,
  });

  const qn: Question = question as Question;

  const {
    data: metadata,
    isError: isMetadataError,
    isLoading: isMetadataLoading,
    refetch: fetch_metadata,
  } = useQuery(
    ['get-question-metadata', params.id],
    () => axios.get(qn ? qn.uri : ''),
    { enabled: false }
  );

  useEffect(() => {
    fetch_question();
  }, []);

  useEffect(() => {
    if (question) {
      fetch_metadata();
    }
  }, [question]);

  const { config: post_answer_config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_STACK3_ADDRESS as Address,
    abi: post_answer_abi,
    functionName: 'postAnswer',
    args: [qn?.id, url, process.env.NEXT_PUBLIC_HASH_SECRET],
  });

  const { write: post_answer } = useContractWrite({
    ...post_answer_config,
    onError(error) {
      console.log(error);
    },
    async onSuccess(data) {
      await data.wait();
      alert('Answer Posted Successfully!');
      changeUrl('');
      changeAnswer('');
    },
  });

  if (url && post_answer && isAnswering.current) {
    post_answer?.();
    isAnswering.current = false;
  }

  const handleAnswerChange = ({ _, text }: any) => {
    changeAnswer(text);
  };

  const handleImageUpload = async (file: File, callback: any) => {
    const url: string = await uploadFileToPinata(file);
    callback(url);
  };

  const onSubmit = async () => {
    const data = {
      answer,
    };

    const temp_url = await uploadJSONToPinata(data);
    changeUrl(temp_url);
    isAnswering.current = true;
  };

  if (isQuestionLoading || isMetadataLoading) {
    return (
      <Wrapper>
        <div>Loading...</div>
      </Wrapper>
    );
  }

  if (isQuestionError || isMetadataError) {
    return (
      <Wrapper>
        <div>Something went wrong!</div>
      </Wrapper>
    );
  }

  if (!question || !metadata) {
    return (
      <Wrapper>
        <div>Found no question with {params?.id}! </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <>
        <div className='flex flex-col items-start justify-start gap-[8px] text-[32px] text-white mb-7'>
          <h1 className='text-[32px] leading-10 m-0'>
            {metadata?.data?.title}
          </h1>
          <div className='flex flex-row items-center justify-start gap-4 text-xs text-silver-100 mb-2'>
            <div>
              <span>{`Asked `}</span>
              <span className='font-semibold text-silver-200'>Today</span>
            </div>
            <div>
              <span>{`Modified `}</span>
              <span className='font-semibold text-silver-200'>Today</span>
            </div>
            <div>
              <span>{`Viewed `}</span>
              <span className='font-semibold text-silver-200'>6 Times</span>
            </div>
          </div>
          <div className='flex flex-row items-center justify-start gap-2 mb-8'>
            <TagChip title='JavaScript' />
            <TagChip title='NFT' />
            <TagChip title='Web3' />
          </div>
        </div>

        <div className='m-0 mb-12'>
          <ContentCard
            voteCount={qn?.upvotes.sub(qn?.downvotes).toNumber()}
            content={metadata?.data?.question}
            comments={qn?.comments}
            authorAddress={qn?.author}
            postId={qn?.id.toNumber()}
            type={'Question'}
          />
        </div>

        <div className='text-[24px] leading-6 mb-3 font-medium text-silver-100'>
          {qn?.answers?.length} Answers
        </div>

        <div className='h-[max-content] mt-16'>
          <label
            htmlFor='details'
            className='text-white text-base leading-5 block mb-[14px]'>
            Write your answer below*{' '}
            <span className='text-gray-200'>
              (Please explain it in a clear and detailed way so that there is no
              confusion. Please use Markdown.)
            </span>
          </label>
          <MdEditor
            id='details'
            name='details'
            value={answer}
            aria-required
            className='h-[300px] border-none bg-darkblue rounded-sm'
            shortcuts={true}
            renderHTML={renderHTML}
            onChange={handleAnswerChange}
            onImageUpload={handleImageUpload}
          />
          <div className='w-full flex justify-end gap-x-4 mt-4'>
            <button
              onClick={() => changeAnswer('')}
              className='border-none py-3 px-5 rounded-md cursor-pointer font-semibold bg-white text-dark-blue'>
              Cancel
            </button>
            <button
              disabled={!answer}
              onClick={onSubmit}
              className='border-none py-3 px-5 rounded-md cursor-pointer font-semibold bg-blue text-white'>
              Submit
            </button>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default Question;

const Wrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='bg-darkblue px-6 py-14 xl:p-[56px]'>
      <div className='grid grid-cols-12 gap-x-6 items-start justify-start'>
        <div className='hidden lg:flex col-span-3 flex-col gap-y-6'>
          <TrendingTags />
          <RelatedQuestions />
        </div>
        <div className='col-span-12 lg:col-span-9 rounded-3xl bg-gray-100 p-6 xl:p-9'>
          {children}
        </div>
      </div>
    </div>
  );
};

function renderHTML(text: string) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={materialOceanic}
              language={match[1]}
              PreTag='div'
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        h1: (props: any) => <h1 className='m-0 text-white' {...props} />,
        h2: (props: any) => <h2 className='m-0 text-white' {...props} />,
        h3: (props: any) => <h3 className='m-0 text-white' {...props} />,
        h4: (props: any) => <h4 className='m-0 text-white' {...props} />,
        h5: (props: any) => <h5 className='m-0 text-white' {...props} />,
        h6: (props: any) => <h6 className='m-0 text-white' {...props} />,
        p: (props: any) => <p className='m-0 text-white' {...props} />,
        ul: (props: any) => <ul className='m-0 text-white' {...props} />,
        ol: (props: any) => <ol className='m-0 text-white' {...props} />,
        td: (props: any) => <td className='m-0 text-white' {...props} />,
      }}>
      {text}
    </ReactMarkdown>
  );
}
