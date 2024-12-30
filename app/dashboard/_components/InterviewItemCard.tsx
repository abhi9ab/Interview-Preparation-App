'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

interface InterviewItemCardProps {
    interview: {
        mockId: string;
        jobPosition: string;
        jobExperience: string;
        createdAt: string | null;
    };
}

const InterviewItemCard: React.FC<InterviewItemCardProps> = ({ interview }) => {
    const router = useRouter();

    const onStart = () => {
        router.push(`/dashboard/interview/${interview?.mockId}`);
    }

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
    }

    return (
        <div className='flex flex-col gap-2 border shadow-sm rounded-xl p-3'>
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs'>Created at {interview?.createdAt}</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button
                    size='sm'
                    variant='outline'
                    className='w-full'
                    onClick={onFeedback}
                >
                    Feedback
                </Button>
                <Button
                    size='sm'
                    className='w-full'
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    )
}

export default InterviewItemCard