import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

export default function Home({ language }) {

    const { userState } = useContext(DataContext)

    const selectLanguageTitle = () => {
        if (language === 'spanish') {
            return 'Bienvenido al CRM de Wevelopers'
        } else if (language === 'english') {
            return 'Welcome to Wevelopers CRM'
        } else if (language === 'italiano') {
            return 'Benvenuti nel CRM di Wevelopers'
        } else {
            return 'Wevelopers CRMへようこそ'
        }
    }
    const selectLanguageSubtitle = () => {
        if (language === 'spanish') {
            return 'A continuación logueate para ingresar al sistema'
        } else if (language === 'english') {
            return 'Then log in to access the system'
        } else if (language === 'italiano') {
            return 'Si prega di effettuare il login qui sotto per accedere al sistema'
        } else {
            return 'システムにアクセスするには、以下のログインが必要です。'
        }
    }

    return (

    userState === true && user.length >= 1 ?
    <Redirect to='./Dashboard' /> :
    <div style={{ width: '100%', height: 'calc(100vh - 74.38px - 70px)', display: 'flex', flexFlow: 'column', justifyContent: 'center' }}>
        <Redirect to='./' />
        <h1 className="text-center" style={{ marginBottom: 30, fontSize: 50 }}>{selectLanguageTitle()}</h1>
        <h4 className="text-center" style={{ marginBottom: 30 }}>{selectLanguageSubtitle()}</h4>
    </div>
    )
}