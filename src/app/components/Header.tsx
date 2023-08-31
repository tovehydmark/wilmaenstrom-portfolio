import Navigation from './Navigation';

const Header = () => {
  return (
    <>
      <header>
        <div className="header-name-container">
          <h1>Wilma Enström</h1>
          <p>Visual artist</p>
        </div>

        <Navigation></Navigation>
      </header>
    </>
  );
};
export default Header;
