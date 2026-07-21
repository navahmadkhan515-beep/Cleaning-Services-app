import { HiOutlineSparkles } from 'react-icons/hi'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 text-center sm:px-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <HiOutlineSparkles size={26} />
      </div>
      <p className="mt-6 font-mono text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl font-semibold">This page got cleaned away.</h1>
      <p className="mt-3 text-muted">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Button to="/" variant="primary" className="mt-8">Go back home</Button>
    </div>
  )
}

export default NotFound
