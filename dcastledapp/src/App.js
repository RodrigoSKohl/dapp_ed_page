import "./assets/styles/Home.css";
import Login from "./components/Login";

export default function Home() {

//TELA INICIAL RENDERIZADA APOS "LOGIN"
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
         Bem vindo a DCastle!
        </h1>
        <p></p>
        <Login />
        <div className="grid">
          <a href="https://portal.thirdweb.com/" className="card">
            <h2>Whitepaper &rarr;</h2>
            <p>
              Conheça o ecossistema do Dapp e as regras dos smart contracts.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className="card">
            <h2>Dashboard &rarr;</h2>
            <p>
              Acesse a Dashboard e gerencie seus NFTs.
            </p>
          </a>

          <a href="https://portal.thirdweb.com/templates" className="card">
            <h2>RoadMap &rarr;</h2>
            <p>
              Acesse o guia visual do projeto.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
