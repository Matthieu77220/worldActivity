function PagePrincipale() {

    const aujourdHui = new Date();
    const jour = aujourdHui.getDay()

    const heure = aujourdHui.getHours()

    const dateDuJour = [

        {
            jour: "dimanche",
            message :"Déconnecte un peu, les idées arrivent seules.",
            theme : 0
        },
        {
            jour: "lundi",
            message: "Nouvelle semaine, construis quelque chose d'intéressant aujourd'hui",
            theme : 1
        },
        {
            jour: "mardi",
            message: "Teste, casse, améliore : c'est comme ça qu'on progresse.",
            theme : 2
        },
        {
            jour: "mercredi",
            message : "Petit pas aujourd'hui, grosse avancée demain.",
            theme : 3
        },
        {
            jour: "jeudi",
            message: "Optimise t'as journée, pas ton stress.",
            theme : 4
        },
        {
            jour: "vendredi",
            message: "Testes avant de douter, ajuste après.",
            theme: 5
        },
        {
            jour: "samedi",
            message :"Explore, crée, expérimente sans pression.",
            theme: 6
        }
    ]


    const messageDuJour = dateDuJour[jour].message


    function getJourThemeClass(jour){
        switch(jour){
            case 0 :
                return "theme_dimanche"
            case 1 :
                return "theme_lundi"
            case 2 :
                return "theme_mardi"
            case 3 :
                return "theme_mercredi"
            case 4 :
                return "theme_jeudi"
            case 5 :
                return "theme_vendredi"
            case 6 :
                return "theme_samedi"
            case null:
                return console.log("problème lors de la récupération du jour")
        }
    }
    
    function getHeureThemeClass(heure){
        if( heure >= 0 && heure <= 5){
            return "theme_nuit"
        } 
        else if(heure >= 6 && heure <= 11){
            return "theme_matin"
        }
        else if(heure >= 12 && heure <= 17){
            return "theme_aprem"
        }
        else if(heure >= 18 && heure <= 23){
            return "theme_soir"
        }
        else {
            return console.log("problème lors de la récupération de l'heure")
        }
    }

    const themeClassJour = getJourThemeClass(jour)
    const themeClassHeure = getHeureThemeClass(heure)

  return (
    <>
    <div className={themeClassJour}>
        <div className={themeClassHeure}>
            <h2>{messageDuJour}</h2>
        </div>
    </div>
    </>
  );
}

export default PagePrincipale;