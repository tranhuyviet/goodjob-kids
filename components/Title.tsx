interface ITitle {
    title: string
    className?: string
}

const Title = ({ title, className = '' }: ITitle) => {
    return (
        <h1 className={`text-4xl text-center text-yellow-400 px-4 py-4 ${className} uppercase`}>{title}</h1>
    )
}

export default Title