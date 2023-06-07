import React from 'react';
import {ConnectWallet} from "@thirdweb-dev/react";


function Connect() {
    return         <div className="connect">
    <ConnectWallet modalTitle="Escolha Sua Carteira"  btnTitle="Conectar Carteira " />
    </div>
  ;
  }
  ///////////////////
  
  
  //EXPORTA LOGIN
  export default Connect;