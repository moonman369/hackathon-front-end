export const post_question_abi = [
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: '_tags',
        type: 'uint256[]',
      },
      {
        internalType: 'string',
        name: '_uri',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: '_secret',
        type: 'bytes32',
      },
    ],
    name: 'postQuestion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const get_all_questions_by_user_address = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getQuestionsByUserAddress',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const get_all_questions_by_id = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getQuestionById',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'bestAnswerChosen',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'upvotes',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'downvotes',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'tags',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'comments',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'answers',
            type: 'uint256[]',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        internalType: 'struct Stack3.Question',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const get_total_counts = [
  {
    inputs: [],
    name: 'getTotalCounts',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const post_comment_abi = [
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_postType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_postId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_uri',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: '_secret',
        type: 'bytes32',
      },
    ],
    name: 'postComment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const vote_question_abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_qid',
        type: 'uint256',
      },
      {
        internalType: 'int8',
        name: '_vote',
        type: 'int8',
      },
      {
        internalType: 'bytes32',
        name: '_secret',
        type: 'bytes32',
      },
    ],
    name: 'voteQuestion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const is_user_voted_q_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 's_userVotedQuestion',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const is_user_voted_a_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 's_userVotedAnswer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const post_answer_abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_qid',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_uri',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: '_secret',
        type: 'bytes32',
      },
    ],
    name: 'postAnswer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const get_comment_by_id = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getCommentById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'enum Stack3.PostType',
            name: 'parentPostType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'parentPostId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        internalType: 'struct Stack3.Comment',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
