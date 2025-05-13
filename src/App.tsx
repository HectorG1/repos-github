import { useState } from "react";
import { useFetchRepositories } from "./hooks/useRepost"
import { useFavoroiteReposStore } from "./store/favoriteRepos";
import { useTranslation } from "react-i18next";
import { type Repository } from "./hooks/types";
import Card from "./components/Card/Card";
import CardUser from "./components/CardUser.tsx/CardUser";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";
import Spinner from "./components/UI/Spinner/Spinner";
import Button from "./components/UI/Button/Button";
import LanguageSwitch from "./components/UI/LanguageSwitch/LanguageSwitch";

import './App.css'

export default function App() {

  const [showFavorites, setShowFavorites] = useState(false);
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const { favoriteReposIds, gitHubUser, setGitHubUser } = useFavoroiteReposStore();
  const { data, isLoading } = useFetchRepositories(gitHubUser);
  const { t } = useTranslation();

  const isFavorite = (repo: Repository) => favoriteReposIds.some(({ id, user }) => id === repo.id && user === gitHubUser);
  const toggleModal = () => {
    if (showFavorites) {
      setShowFavorites(false);
    } else {
      setGitHubUser('');
    }
  }

  const groupedFavorites = favoriteReposIds.reduce((acc, { user, id }) => {
    if (!acc[user]) acc[user] = [];
    acc[user].push(id);
    return acc;
  }, {} as Record<string, number[]>);

  const buttonLabel = showFavorites ? 'showAll' : 'showFavorites';
  const title = showFavorites ? 'titleFavorite' : 'title';
  const modalLabel = showFavorites ? 'noFavorites' : 'noRepositories';
  const modalDescription = showFavorites ? 'errorFavorites' : 'errorDescription';
  const dataToShow = (showFavorites ? data?.filter((repo) => isFavorite(repo)) : data) ?? [];
  const repositoryLength = showFavorites ? favoriteReposIds.filter(({ user }) => user === gitHubUser).length : data?.length ?? 0;

  if (gitHubUser && isLoading) return <Spinner />

  return (
    <div className="appContainer">
      <LanguageSwitch />
      {!gitHubUser ? (
        <>
          <Form />
          {favoriteReposIds.length > 0 && (
            <div className="favSectionContainer">
              <h2>{t('alreadyHaveFavorites')}</h2>
              <Button label={t(showAllFavorites ? 'hideThem' : 'showThem')} onClick={() => setShowAllFavorites(!showAllFavorites)} size="lg" />
              {
                showAllFavorites && (
                  <div className="cardsUserContainer">
                    {Object.keys(groupedFavorites).map((user) => (
                      <CardUser user={user} key={user} onClick={() => { setGitHubUser(user); setShowFavorites(true) }} length={groupedFavorites[user].length} />
                    ))}
                  </div>
                )
              }
            </div>
          )}
          <footer className="footerContainer">
            <p className="footerText">
              {t('footerText')}
            </p>
          </footer>
        </>
      ) : (
        <>
          <div className="headerContainer">
            <img src={data![0]?.owner.avatar_url} alt="GitHubUser logo" className="logo" />
            <div>
              <h1>{`${t(title, { username: gitHubUser })} (${repositoryLength})`}</h1>
              <div className="buttonGroup">
                <Button label={t('changeUser')} onClick={() => { setGitHubUser(''); setShowFavorites(false) }} size="md" />
                <Button label={t(buttonLabel)} onClick={() => setShowFavorites(!showFavorites)} size="md" />
              </div>
            </div>
          </div>
          {dataToShow?.length > 0 ? (
            <div className="cardsContainer">
              {dataToShow?.map((repo) => (
                <Card key={repo.id} repo={repo} isFavorite={isFavorite(repo)} />
              ))}
            </div>
          ) : (
            <Modal action={toggleModal} label={t(modalLabel)} description={t(modalDescription)} />
          )}
        </>
      )}
    </div>
  )
}
