import { GetServerSideProps } from 'next'
import React from 'react'

const HistoryPage = () => {
    return (
        <div className="container min-h-[calc(100vh-68px)] shadow-md relative pt-6">History Page</div>
    )
}

export default HistoryPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const name = context.req.cookies.goodjobKids
    if (!name) return { redirect: { destination: '/signup', permanent: false } };

    return {
        props: {}
    }
}