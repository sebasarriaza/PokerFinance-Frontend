import { configureChains, createClient } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: "W5_jyOXTgGy0MfDtA6aT-SD9pNNYmEry" }), publicProvider()],
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
});

// interface WagmiProviderProps {
//   children: ReactNode;
// }

// export const WagmiProvider: FC<WagmiProviderProps> = ({ children }) => {
//   return <WagmiConfig config={client}>{children}</WagmiConfig>;
// };


