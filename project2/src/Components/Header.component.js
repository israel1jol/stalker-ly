import Boxes from "./Boxes.component";

const Header = () => {
    return(
        <div className="custom-bg-dark">
            <div className="header-div px-5">
                <div className="mt-4">
                    <Boxes />
                </div>
                <div className="mx-auto right-div">
                    <div className="display-6">WHERE. WHEN. WHO.</div>
                    <br />
                    <article>
                        <p className="lead">The three Ws of social media</p>
                    </article>
                    <section className="special-font">
                        Chat realtime with your friends and family on Stalkerly.
                    </section>
                </div>
            </div>
        </div>
        
    )
}

export default Header;