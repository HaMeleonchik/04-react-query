import styles from "./SearchBar.module.css"
// import { Formik, Form, Field } from 'formik';
// import type { FormikHelpers } from "formik";
import toast from 'react-hot-toast';
interface SearchBarProps{
    onSubmit: (query: string) => void
}
export default function SearchBar({onSubmit}:SearchBarProps) { 
// Formik
//   interface FormValues {
//     query: string,
//   }
//   const formValues: FormValues = {
//     query: "",
// }

//   const handleSubmit = (values:FormValues, formikHelpers:FormikHelpers<FormValues>) => {
//     if (values.query === "") {
//       toast.error("Please enter your search query.")
//       return
//     }
//     onSubmit(values.query)
//     formikHelpers.resetForm()
//   }
  
const handleSubmit = (formData: FormData) => {
  const query = formData.get("query") as string
  if (query === "") {
    toast.error("Please enter your search query.")
    return
  }
      onSubmit(query)
  }
  
return (<header className={styles.header}>
    <div className={styles.container}>
      <a
        className={styles.link}
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by TMDB
    </a>
    {/* <Formik initialValues={formValues} onSubmit={handleSubmit}> */}
      <form className={styles.form} action={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search movies..."
          autoFocus
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      {/* </Formik> */}
    </div>
  </header>)
}
