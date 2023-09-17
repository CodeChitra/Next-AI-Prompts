import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
    title: "Ai-Prompts",
    description: "Share & Discover AI Prompts"
}
const RootLayout = ({ children }) => {
    return (
        <html>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient">
                        </div>
                    </div>

                    <main className="app">
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;
