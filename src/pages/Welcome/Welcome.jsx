import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

export default function Home() {
    const [t, i18n] = useTranslation("global");

    const { userState, user } = useContext(DataContext)

    return (
    userState === true && user.length >= 1 ?
    <Redirect to='./Dashboard' /> :
    <div style={{ width: '100%', height: 'calc(100vh - 74.38px - 70px)', display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
        <Redirect to='./' />
        <h1 className="text-center" style={{ marginBottom: 30, fontSize: 50 }}>{t("home.welcome_title")}</h1>
        <h4 className="text-center" style={{ marginBottom: 30 }}>{t("home.welcome_subtitle")}</h4>
    </div>
    )
}