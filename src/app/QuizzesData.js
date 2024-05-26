import { faCode } from "@fortawesome/free-solid-svg-icons";

export const quizzesData = [
    {
        id: 1,
        icon: faCode,
        quizTitle: "Ptit Quiz",
        quizQuestions: [
            {
                id: 1,
                mainQuestion: 'Cau 1',
                choices: [
                    'A. dap an a',
                    'B. dap an b',
                    'C. dap an c',
                    'D. dap an d',
                ],
                correctAnswer: 1,
                answeredResult:-1,
                statistic: {
                    totalAttempts:0,
                    correctAttempts:0,
                    incorretAttempts:0,
                },
            },

            {
                id: 2,
                mainQuestion: 'Cau 2',
                choices: [
                    'A. dap an a',
                    'B. dap an b',
                    'C. dap an c',
                    'D. dap an d',
                ],
                correctAnswer: 1,
                answeredResult:-1,
                statistic: {
                    totalAttempts:0,
                    correctAttempts:0,
                    incorretAttempts:0,
                },
            },

            
        ]
    }
]