type ErrorProps = {
    msg: string
}

const Error = ({msg}: ErrorProps) => {
  return (
    <p className="text-center text-sm px-3 py-2 bg-red-600 my-2 text-white font-bold uppercase">{msg}</p>
  )
}

export default Error