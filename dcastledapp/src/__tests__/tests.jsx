const App = () => {
    // Usando os hooks que o thirdweb nos dá.
    const address = useAddress();
    const network = useNetwork();
    const isMismatched = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
  
  
    
    console.log("Address:", address);
    // inicializar o contrato editionDrop
    const editionDropAddress = "0x31DeBdbD079eeB9A0513ccbf5caeA2B398915A05"
    const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
   
  //Hook que verifica a contagem total de Seasons
     const lastSeason = editionDropAddress.totalCount();
  
  //Hook retorna metadados das Seasons
     const { data: mlast } = useNFT(editionDrop, String(lastSeason)); 
     const { data: mS1 } = useNFT(editionDrop, "0");
   //  const { data: mS2 } = useNFT(editionDrop, "1");   
   //  const { data: mS3 } = useNFT(editionDrop, "2");      
  
  //Hook retorna quantidade de NFTs de cada Season do adress conectado   
     const { data: S1 } = useNFTBalance(editionDrop, address, "0")
     //const { data: S2 } = useNFTBalance(editionDrop, address, "1")
     //const { data: S3 } = useNFTBalance(editionDrop, address, "2")
    
   //se o address conectado tem mais que 1 NFT de cada Season
    const S1Pass = useMemo(() => {
      return S1 && S1.gt(0)
    }, [S1])
  
   // const S2Pass = useMemo(() => {
   //   return S2 && S2.gt(0)
   // }, [S2])
  
   // const S3Pass = useMemo(() => {
   //   return S3 && S3.gt(0)
  //  }, [S3])
  
  
  
      // Se ele não tiver uma carteira conectada vamos chamar Connect Wallet
      if (!address) {
      return (
        <div className="landing">
          <h1>Bem vindo</h1>
          <div className="btn-hero">
            <ConnectWallet btnTitle="Conectar Carteira" />
          </div>
        </div>
      );
    }
  
  
    
  // Se ele não estiver conectado na rede teste retorna erro
    if (address && (network?.[0].data.chain.id !== ChainId.Mumbai)) {
      return (
        <div className="unsupported-network">
          <h2>Por favor, conecte-se à rede Mumbai</h2>
          <p>
            Voce quer torrar seus ETH maluco? 
            Aqui só aceita testnet.
          </p>
          <p>
          <p>{isMismatched}</p>
        {isMismatched && (
          <button onClick={() => switchNetwork(ChainId.Goerli)}>
            Trocar para Mumbai
          </button>
        )}
          </p>
        </div>
      );
    }
  
  //Renderiza pagina da S1
  if (S1Pass) {
    return (
      <div className="member-page">
        <ThirdwebNftMedia metadata={mS1.metadata} />
        <p></p>
        </div>
      )  
    };
  
  
  
    // Renderiza a tela de cunhagem do NFT.
      return (
      <div className="mint-nft">
        <ThirdwebNftMedia metadata={mlast.metadata} />
        <h1>Minte o NFT da Season Pass enquanto ainda há tempo!</h1>
        <div className="btn-hero">
          <Web3Button 
            contractAddress={editionDropAddress}
            action={contract => {
              contract.erc1155.claim(lastSeason, 1)
            }}
            onSuccess={() => {
              console.log(`NFT mintado! Cheque seu NFT em: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
            }}
            onError={error => {
              console.error("Não deu pra mintar seu NFT, tente novamente", error);
            }}
          >
            MINTE SEU NFT!
          </Web3Button>
          
        </div>
      </div>
    );
          
  
    
  
    
  
  }
  