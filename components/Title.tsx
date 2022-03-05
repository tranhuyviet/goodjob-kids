import React from 'react'

interface ITitle {
    name: string
}

const Title = ({ name }: ITitle) => {
    return (
        <h1 className="text-3xl text-center mt-4 text-yellow-400 px-4">{`Good Job ${name} !!!`}</h1>
    )
}

export default Title