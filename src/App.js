import React, { Component } from "react";
import Navbar from "./components/Navbar";
import theme from "./theme";
import styled from "styled-components";
import Flex from "./components/Flex";
import Card from "./components/Card";
import CountryCloud from "./visualisations/CountryCloud";
import LineChart from "./visualisations/LineChart";
import Autocomplete from "./components/Autocomplete";
import { ReactComponent as HeartSVG } from "./img/heart.svg";
import { ReactComponent as Loading } from "./img/loading.svg";

import * as d3 from "d3";
import distributionFile from "./data/distribution.csv";
import SpiderChart from "./visualisations/SpiderChart";

const Heart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  background-color: ${(props) => props.bg};
  border-radius: 100%;

  svg > path {
    fill: ${(props) => props.color};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 90vh;
`;

const Circle = styled.div`
  width: 55px;
  height: 55px;
  background: ${theme.colors.red};
  border-radius: 35px;
`;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function StatsCard(props) {
  return (
    <Card {...props}>
      <Flex align="center">
        <div>{props.children}</div>
        <div style={{ marginLeft: 30 }}>
          <h2 style={{ color: props.color, margin: 0 }}>{props.number}</h2>
          <h4
            style={{ color: theme.colors.darkCrem, margin: 0, marginTop: -3 }}
          >
            {props.description}
          </h4>
        </div>
      </Flex>
    </Card>
  );
}

function Hero(props) {
  const totalDeaths = props.data.reduce((prev, curr) => {
    return prev + curr.totalDeaths;
  }, 0);

  const totalCases = props.data.reduce((prev, curr) => {
    return prev + curr.totalCases;
  }, 0);

  return (
    <Wrapper>
      <Flex justify="space-between" align="flex-end" style={{ width: "100%" }}>
        <div>
          <Circle />
          <h1>Covid 19</h1>
          <h3>
            Visualising Covid-19 Data <br />
            Globally
          </h3>
          <Flex align="center" mt={4}>
            <StatsCard
              number={numberWithCommas(totalCases)}
              description="Confirmed cases"
              color={theme.colors.red}
            >
              <LineChart
                cases
                data={props.global}
                width="60"
                height="50"
                color={theme.colors.red}
              />
            </StatsCard>
            <StatsCard
              number={numberWithCommas(totalDeaths)}
              description="Deaths"
              color={theme.colors.blue}
              ml={4}
            >
              <LineChart
                deaths
                data={props.global}
                width="60"
                height="50"
                color={theme.colors.blue}
              />
            </StatsCard>
          </Flex>
        </div>
        <Flex dir="column" align="center">
          <CountryCloud data={props.data} />
          <h4 style={{ color: theme.colors.darkCrem }}>
            Current World Wide Data
          </h4>
          <h3>Top 40 Affected Countries</h3>
        </Flex>
      </Flex>
    </Wrapper>
  );
}

function Healthcare(props) {
  return (
    <Flex justify="space-between" style={{ width: "100%" }}>
      <div style={{ flexGrow: 1, flexBasis: 0 }}>
        <h2>Healthcare vs Virus</h2>
        <p>
          Analysing the differences between health expenditure (% of GDP),
          coronavirus total cases and recovered.
        </p>
        <Flex my={4} />
        <h3 style={{ color: theme.colors.red }}>
          <strong>Lorem Ipsum</strong>
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptuaLorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diamLorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero voluptua. At
          vero At vero
        </p>
        <Flex my={3} />
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero
        </p>

        <Flex align="center" mt={4}>
          <StatsCard
            number="18%"
            description="% of GDP"
            color={theme.colors.blue}
            mr={3}
          >
            <Heart color={theme.colors.blue} bg={theme.colors.lightBlue}>
              <HeartSVG width="30" height="30" />
            </Heart>
          </StatsCard>
          <h3 style={{ color: theme.colors.darkCrem, fontWeight: "bold" }}>
            vs
          </h3>
          <StatsCard
            number="132.422"
            description="Recovered"
            color={theme.colors.green}
            ml={3}
          >
            <Heart color={theme.colors.green} bg={theme.colors.lightGreen}>
              <HeartSVG width="30" height="30" />
            </Heart>
          </StatsCard>
        </Flex>
      </div>
      <div style={{ flexGrow: 1, flexBasis: 0 }}>
        <Flex dir="column" align="center" style={{ width: "100%" }}>
          <Flex align="center">
            <Autocomplete callback={props.callback} />
          </Flex>

          <Flex my={4} />
          <h4 style={{ color: theme.colors.darkCrem, margin: 0 }}>
            Currently showing data for
          </h4>

          <h3 style={{ marginTop: 5 }}>
            {props.selectedCountry.geoId
              .toUpperCase()
              .replace(/./g, (char) =>
                String.fromCodePoint(char.charCodeAt(0) + 127397)
              )}{" "}
            {props.selectedCountry.name}
          </h3>

          <SpiderChart data={props.spiderData} />
        </Flex>
      </div>
    </Flex>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reduced: null,
      distribution: null,
      spider: [
        [
          { axis: "Total cases", value: 0.22 },
          { axis: "Deaths", value: 0.28 },
          { axis: "Recovered", value: 0.29 },
          { axis: "Healthcare", value: 0.17 },
        ],
      ],
      selectedCountry: {
        name: "United Kingdom",
        geoId: "GB",
      },
    };
  }

  loadCSVData = async (filename) => {
    return await d3
      .csv(filename)
      .then((csv) => {
        //group data by year

        // convert the string date to actual date object
        csv.forEach((b) => {
          b.date = d3.utcParse("%Y-%m-%d")(b.dateRep);
          b.cases = parseInt(b.cases.toString().replace(",", ""));
          b.deaths = parseInt(b.deaths.toString().replace(",", ""));
          b.popData2018 = parseInt(b.popData2018.toString().replace(",", ""));
        });
        return csv;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  reduceTotal = (data) => {
    var grouped = d3
      .nest()
      .key(function (d) {
        return d.geoId;
      })
      .entries(data);

    grouped.forEach((country) => {
      country.totalDeaths = country.values.reduce((prev, curr) => {
        return prev + curr.deaths;
      }, 0);
      country.totalCases = country.values.reduce((prev, curr) => {
        return prev + curr.cases;
      }, 0);
    });
    return grouped;
  };

  calculateGlobalEvolution = (data) => {
    let grouped = d3
      .nest()
      .key((d) => d.date)
      .entries(data);

    grouped.forEach((date) => {
      date.totalCases = date.values.reduce((prev, curr) => {
        return prev + curr.cases;
      }, 0);

      date.totalDeaths = date.values.reduce((prev, curr) => {
        return prev + curr.deaths;
      }, 0);
    });
    return grouped;
  };

  async componentDidMount() {
    let distribution = await this.loadCSVData(distributionFile);

    let reduced = this.reduceTotal(distribution);
    this.setState({ reduced: reduced });

    let global = this.calculateGlobalEvolution(distribution);
    this.setState({ global: global });

    this.setState({ distribution: distribution });
  }

  render() {
    if (this.state.distribution === null) {
      return (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Loading />
          <p>Loading...</p>
        </div>
      );
    } else
      return (
        <div className="container">
          <Navbar />
          <Hero global={this.state.global} data={this.state.reduced} />
          <Flex my={4} />
          <Healthcare
            spiderData={this.state.spider}
            selectedCountry={this.state.selectedCountry}
            callback={(value) => {
              let selectedCountry = this.state.reduced.filter(
                (c) => c.key === value.geoId
              )[0];
              let spiderData = [
                [
                  { axis: "Deaths", value: selectedCountry.totalDeaths / 100 },
                  { axis: "Cases", value: selectedCountry.totalCases / 100 },
                  { axis: "Recovered", value: 0.4 },
                  { axis: "Healthcare", value: 0.3 },
                ],
              ];
              console.log(selectedCountry);
              //process data
              this.setState({ spider: spiderData, selectedCountry: value });
            }}
          />
          <Flex my={4} />
        </div>
      );
  }
}
