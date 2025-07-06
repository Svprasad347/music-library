import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SongsList from "../src/Components/SongsList";

// Sample Songs used across multiple tests
const sampleSongs = [
  { id: 1, title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2" },
  { id: 2, title: "Butta Bomma", artist: "Armaan Malik", album: "Ala Vaikunthapurramuloo" },
  { id: 3, title: "Rowdy Baby", artist: "Dhanush & Dhee", album: "Maari 2" },
];

describe("SongList Component", () => {
  it("renders songs", () => {
    render(<SongsList role="user" songs={sampleSongs} />);
    expect(screen.getByText(/Tum Hi Ho/i)).toBeInTheDocument();
    expect(screen.getByText(/Butta Bomma/i)).toBeInTheDocument();
    expect(screen.getByText(/Rowdy Baby/i)).toBeInTheDocument();
  });

  it("filters songs based on search", () => {
    render(<SongsList role="user" songs={sampleSongs} />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "rowdy" } });

    expect(screen.queryByText(/Tum Hi Ho/i)).toBeNull();
    expect(screen.getByText(/Rowdy Baby/i)).toBeInTheDocument();
  });

  it("displays 'Add Song' button for admin", () => {
    render(<SongsList role="admin" songs={sampleSongs} />);
    expect(screen.getByRole("button", { name: /Add Song/i })).toBeInTheDocument();
  });

  it("does not display 'Add Song' button for user", () => {
    render(<SongsList role="user" songs={sampleSongs} />);
    expect(screen.queryByRole("button", { name: /Add Song/i })).toBeNull();
  });

  it("groups songs by album", () => {
    render(<SongsList role="user" songs={sampleSongs} />);
    const groupBySelect = screen.getByDisplayValue("-- Group By --");
    fireEvent.change(groupBySelect, { target: { value: "album" } });

    expect(screen.getByText(/ALBUM: Aashiqui 2/i)).toBeInTheDocument();
    expect(screen.getByText(/ALBUM: Ala Vaikunthapurramuloo/i)).toBeInTheDocument();
    expect(screen.getByText(/ALBUM: Maari 2/i)).toBeInTheDocument();
  });

  it("adds a new song when admin submits the form", () => {
    render(<SongsList role="admin" songs={[]} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Song" },
    });
    fireEvent.change(screen.getByPlaceholderText("Artist"), {
      target: { value: "Test Artist" },
    });
    fireEvent.change(screen.getByPlaceholderText("Album"), {
      target: { value: "Test Album" },
    });

    fireEvent.click(screen.getByText("Add Song"));

    expect(screen.getByText(/Test Song/i)).toBeInTheDocument();
  });

  it("deletes a song when delete is clicked", () => {
    window.confirm = jest.fn(() => true); // Simulate confirmation
    render(<SongsList role="admin" songs={[...sampleSongs]} />);

    // Click delete on the first delete button
    const deleteBtn = screen.getAllByRole("button", { name: /delete/i })[0];
    fireEvent.click(deleteBtn);

    // Check that the first song is gone
    expect(screen.queryByText(/Tum Hi Ho/i)).toBeNull();
  });

  it("sorts songs by title", () => {
    const songsToSort = [
      { id: 1, title: "Zebra", artist: "X", album: "Album X" },
      { id: 2, title: "Apple", artist: "A", album: "Album A" },
    ];

    render(<SongsList role="user" songs={songsToSort} />);

    fireEvent.change(screen.getByDisplayValue("-- Sort By --"), {
      target: { value: "title" },
    });

    const songItems = screen.getAllByRole("listitem");
    const titles = songItems.map((item) => item.textContent);

    expect(titles[0]).toContain("Apple");
    expect(titles[1]).toContain("Zebra");
  });
});
