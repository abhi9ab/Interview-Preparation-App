'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QuestionSection from './_components/QuestionSection'
import RecordAnswerSection from './_components/RecordAnswerSection';

interface InterviewQuestion {
    question: string;
    answer: string;
}

const StartInterview = () => {
    const { interviewId } = useParams(); // Extract interviewId from the route
    const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([]);
    const [ activeQuestionIndex, setActiveQuestionIndex ] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/interviews/${interviewId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch interview data');
                }

                const data = await response.json();
                const parsedData = JSON.parse(data.jsonMockResp); // Parse JSON content

                if (parsedData?.interview_questions) {
                    setInterviewQuestions(parsedData.interview_questions);
                } else {
                    throw new Error('Invalid JSON structure');
                }
                console.log(interviewQuestions);
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchData();
    }, [interviewId, interviewQuestions]);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <QuestionSection 
                    interviewQuestions={interviewQuestions}
                    activeQuestionIndex={activeQuestionIndex}
                />

                <RecordAnswerSection />
            </div>
        </div>
    )
}

export default StartInterview