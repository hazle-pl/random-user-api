import { useState } from "react";
import ContentContainer from "../utils/content-container";
import Section from "../utils/section";
import Grid from "../utils/grid";
import Card from "../components/card";

interface UserData {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: string;
  };
  picture: {
    large: string;
  };
  email: string;
  cell: string;
}

const countries = [
  { code: "au", name: "Australia" },
  { code: "br", name: "Brazil" },
  { code: "ca", name: "Canada" },
  { code: "ch", name: "Switzerland" },
  { code: "de", name: "Germany" },
  { code: "dk", name: "Denmark" },
  { code: "es", name: "Spain" },
  { code: "fi", name: "Finland" },
  { code: "fr", name: "France" },
  { code: "gb", name: "United Kingdom" },
  { code: "ie", name: "Ireland" },
  { code: "ir", name: "Iran" },
  { code: "mx", name: "Mexico" },
  { code: "nl", name: "Netherlands" },
  { code: "no", name: "Norway" },
  { code: "nz", name: "New Zealand" },
  { code: "rs", name: "Serbia" },
  { code: "tr", name: "Turkey" },
  { code: "ua", name: "Ukraine" },
  { code: "us", name: "United States" },
];

const countOptions = [5, 10, 15, 20, 25, 30];

const Home = () => {
  const [count, setCount] = useState<number>(5);
  const [country, setCountry] = useState<string>("au");
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${count}&nat=${country}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    fetchData();
  };

  return (
    <>
      <Section id="form">
        <ContentContainer>
          <form>
            <div className="count">
              <label htmlFor="country">Count</label>
              <select
                id="count"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                {countOptions.map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="country">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button className="generate" onClick={handleGenerate}>
            Generate
          </button>
        </ContentContainer>
      </Section>
      {loading ? (
        <Section id="results">
          <ContentContainer>
            <Grid gap={3} xl={4} md={2} xs={1}>
              {Array.from({ length: count }, (_, index) => (
                <Card className="skeleton" key={index}>
                  <div className="avatar-box" />
                  <div className="information">
                    <p className="name"></p>
                    <p className="location"></p>
                  </div>
                </Card>
              ))}
            </Grid>
          </ContentContainer>
        </Section>
      ) : (
        <Section id="results">
          <ContentContainer>
            <Grid gap={3} xl={4} md={2} xs={1}>
              {users.map((user, index) => (
                <Card className={user.gender} key={index}>
                  <div className="avatar-box">
                    <img className="avatar" src={user.picture.large} />
                  </div>
                  <div className="information">
                    <p className="name">
                      {user.name.first} {user.name.last}
                    </p>
                    <p className="location">
                      {user.location.city}, {user.location.country}
                    </p>
                  </div>
                </Card>
              ))}
            </Grid>
          </ContentContainer>
        </Section>
      )}
    </>
  );
};

export default Home;
