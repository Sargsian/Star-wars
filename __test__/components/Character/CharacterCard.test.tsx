import { fireEvent, render, screen } from "@testing-library/react";
import { CharacterCard } from "src/components";

const character = {
  birth_year: "19 BBY",
  eye_color: "Blue",
  films: ["https://swapi.dev/api/films/1/"],
  gender: "Male",
  hair_color: "Blond",
  height: "172",
  homeworld: "https://swapi.dev/api/planets/1/",
  mass: "77",
  name: "Luke Skywalker",
  skin_color: "Fair",
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-10T13:52:43.172000Z",
  species: ["https://swapi.dev/api/species/1/"],
  starships: ["https://swapi.dev/api/starships/12/"],
  url: "https://swapi.dev/api/people/1/",
  vehicles: ["https://swapi.dev/api/vehicles/14/"],
};

it("card loading skeleton", () => {
  render(<CharacterCard isLoading={true} />);
  expect(screen.getByTestId("skeleton")).toBeInTheDocument();
});

it("no skeleton if loading finished", () => {
  render(<CharacterCard isLoading={false} />);
  expect(screen.queryByTestId("skeleton")).toBeNull();
});

describe("Loading finished, card rendered", () => {
  beforeEach(() => {
    render(<CharacterCard isLoading={false} character={character} />);
  });

  it("Character rendered if provided by props", () => {
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  it("Modal opened on card click and closed on button click", () => {
    // "hair color" attribute exits only in modal, so this confirms it's not opened
    expect(screen.queryByText(/hair color/i)).toBeNull();
    fireEvent.click(screen.getByText(/Luke Skywalker/i));
    // modal opened since the text is in the document now
    expect(screen.getByText(/hair color/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText(/hair color/i)).toBeNull();
    // and closed again!
  });
});
