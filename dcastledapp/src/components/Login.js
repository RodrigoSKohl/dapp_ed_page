import React from 'react';
import {useChain, useConnectionStatus, useSwitchChain, useAddress, useChainId, useNetworkMismatch} from "@thirdweb-dev/react";
import {Mumbai} from "@thirdweb-dev/chains";
import Connect from './Connect';


//FUNCAO LOGIN
function Login() {

//VARIAVEL DA REDE USADA - MUDAR AQUI, PROPAGA EM TODO CODIGO (NAO ESQUECER DE MUDAR NO IMPORT TAMBEM)
const NetworkPrimaryName = Mumbai.name;
const NetworkPrimaryID = Mumbai.chainId;
///////////////////
//HOOK STATUS CONEXAO
const status = useConnectionStatus();
//HOOK TROCA DE CHAIN ID
const switchChain = useSwitchChain();
//HOOK ADDRESS USUARIO
const address = useAddress();
//HOOK RETORNA CHAIN ID
const chainId = useChainId();
//HOOK RETORNAR BOOLEANO PARA VERIFICAR SE REDE ESTA DESCONECTADA 
const isMismatched = useNetworkMismatch();
//HOOK RETORNA NOME CHAIN CONECTADA
const chain = useChain();
//


///////////////////
//STATUS CONEXAO
if (status === "unknown") return <div> Loading... </div>;
if (status === "disconnected") return <div>

<Connect />

</div>
if (status === "connecting") return <div>connecting... </div>;

//////////////////
//verifica se wallet é um endereço valido, se esta conectada e se ela se encontra na rede correta
if (address && status === "connected" && (chainId !== NetworkPrimaryID) )
  return(
  <div>
  <p className="description">
  Você esta conectado na rede {chain.name}, troque abaixo para a rede {NetworkPrimaryName}.
  </p> 
  <p className="description">  {isMismatched && (
   <button onClick={() => switchChain(NetworkPrimaryID)}>Trocar rede</button>
   )}
   </p>
     </div>
  );

//RENDER LOGIN
  return <div>
  <Connect />
  </div>         

    }
///////////////////


//EXPORTA LOGIN
export default Login;