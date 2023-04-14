// CSS
import styles from "./About.module.css";

const About = () => {
    return (
        <div className={styles.about_container}>
            <h1>Sobre o Community</h1>
            <p>
                Community é uma aplicação de interatividade fullstack, 
                sendo o back-end desenvolvido em Node JS com o framework Express JS, 
                Mongo DB como armazenamento de dados, utilizando o serviço Mongo DB Atlas.
                Foi utilizado a biblioteca Multer para fazer o upload de imagens, e as bibliotecas
                Winston e Morgan para construir um sistema de logs. Para lidar com autenticação,
                foi utilizado a biblioteca JSON Web Token(JWT) e a biblioteca bcryptjs, para lidar com
                dados sensíveis.
            </p>
            <p>
                O front-end foi construído utilizando a biblioteca React JS, Redux com a
                ferramenta Redux Toolkit, e a biblioteca React Router Dom para roteamento das páginas.
            </p>
            <p>Tanto o front-end quanto o back-end foram desenvolvidos utilizando Typescript.</p>
        </div>
    );
}

export default About;