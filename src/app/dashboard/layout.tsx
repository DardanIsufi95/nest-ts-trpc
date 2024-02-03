import {SocketProvider} from "./provider";


export default function Home({ children }:{children: React.ReactNode}) {
    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    );
}