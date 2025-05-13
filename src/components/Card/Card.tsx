import { useTranslation } from "react-i18next"
import { Repository } from "../../hooks/types"
import { useFavoroiteReposStore } from "../../store/favoriteRepos"
import Button from "../UI/Button/Button"

import './card.css'

type CardProps = {
  repo: Repository,
  isFavorite?: boolean,
}

function Card({ repo, isFavorite }: CardProps) {
  const { addFavoriteRepo, removeFavoriteRepo, gitHubUser } = useFavoroiteReposStore()
  const { t } = useTranslation();
  const toogleFavorite = () => {
    if (isFavorite) {
      removeFavoriteRepo(repo.id, gitHubUser)
      return;
    }
    addFavoriteRepo(repo.id)
  }

  const repoName = repo.name.length > 30 ? `${repo.name.slice(0, 30)}...` : repo.name

  return (
    <div className="cardContainer">
      <div className="subContainer">
        <h2>{repoName}</h2>
        <div className="descriptionContainer">
          <p style={{ textAlign: 'center' }}>{repo.description ?? 'No description'}</p>
        </div>
      </div>
      <div className="buttonsContainer">
        <a href={repo.html_url} target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
          <Button label={t('card.viewRepo')} size="md" buttonType="secondary" type="button" />
        </a>
        <Button label={t(`card.${isFavorite ? 'remove' : 'addFavorite'}`)} size="md" onClick={toogleFavorite} buttonType={isFavorite ? 'danger' : 'primary'} />
      </div>
    </div>
  )
}

export default Card;
