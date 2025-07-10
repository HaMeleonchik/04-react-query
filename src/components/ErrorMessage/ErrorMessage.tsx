import css from "./ErrorMessage.module.css"
interface ErrorMessageProps{
    showErrorMessage: boolean
}
export default function ErrorMessage({showErrorMessage: isErrorMessage}:ErrorMessageProps) {
    return isErrorMessage && <p className={css.text}>There was an error, please try again...</p>
}