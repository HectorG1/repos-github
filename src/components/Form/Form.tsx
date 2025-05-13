import { useTranslation } from "react-i18next"
import { useFavoroiteReposStore } from "../../store/favoriteRepos"
import Button from "../UI/Button/Button"

import './form.css'

function Form() {

  const { setGitHubUser } = useFavoroiteReposStore()
  const { t } = useTranslation()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setGitHubUser(formData.get('username')?.toString() || '')
  }

  return (
    <div className="container">
      <h1 className="title">
        {t('form.title')}
      </h1>
      <form className="formContainer" onSubmit={handleSubmit}>
        <input type="text" name="username" id="username" placeholder={t('form.username')} />
        <Button label={t('form.search')} size="full" type="submit" />
      </form>
    </div>
  )
}

export default Form