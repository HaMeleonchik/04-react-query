import css from "./Loader.module.css";
interface LoaderProps{
    showLoading: boolean
}
export default function Loader({showLoading: isLoading}:LoaderProps) {
return isLoading && <p className={css.text}>Loading movies, please wait...</p>
}