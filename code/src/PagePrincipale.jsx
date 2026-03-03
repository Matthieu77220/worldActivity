function PagePrincipale() {

    const aujourdHui = new Date();
    const jour = aujourdHui.getDay()

    const dateDuJour = [

        {
            jour: "dimanche",
            message :"Déconnecte un peu, les idées arrivent seules."
        },
        {
            jour: "lundi",
            message: "Nouvelle semaine, construis quelque chose d'intéressant aujourd'hui"
        },
        {
            jour: "mardi",
            message: "Teste, casse, améliore : c'est comme ça qu'on progresse."
        },
        {
            jour: "mercredi",
            message : "Petit pas aujourd'hui, grosse avancée demain."
        },
        {
            jour: "jeudi",
            message: "Optimise t'as journée, pas ton stress."
        },
        {
            jour: "vendredi",
            message: "Testes avant de douter, ajuste après."
        },
        {
            jour: "samedi",
            message :"Explore, crée, expérimente sans pression."
        }
    ]

    const messageDuJour = dateDuJour[jour].message

  return (
    <>

    <div>
        <h2>{messageDuJour}</h2>
    </div>


    </>
  );
}

export default PagePrincipale;
