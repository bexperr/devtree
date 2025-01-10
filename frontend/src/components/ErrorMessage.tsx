type ErrorMessagePropos = {
  children:React.ReactNode
}

export default function ErrorMessage({children}:ErrorMessagePropos) {
  return (
    <p className=" bg-red-50 text-red-600 p-3 uppercase text-sm font-bold">{children}</p>
  )
}
