import React, { HTMLAttributes } from 'react'

interface ITitle {
    name: string
    className: string
}

const Title = ({ name, className = '' }: ITitle) => {
    return (
        <h1 className={`text-4xl text-center text-yellow-400 px-4 py-4 ${className}`}>{`Good Job ${name} !!!`}</h1>
    )
}

export default Title