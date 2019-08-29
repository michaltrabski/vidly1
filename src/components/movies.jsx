import React, { Component } from "react";
import { getMovies } from "services/fakeMovieService";
import Pagination from "components/pagination";
import { paginate } from "utils/paginate";
import ListGroup from "components/listGroup";
import { getGenres } from "services/fakeGenreService";
// import { listenerCount } from "cluster";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenres: "",
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount() {
    const genres = [{ name: "All genres" }, ...getGenres()];
    this.setState({ genres, movies: getMovies() });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    const { currentPage, pageSize } = this.state;
    this.setState({ movies });
    const currentPageDontExist =
      currentPage - movies.length / pageSize - 1 === 0 ? true : false;

    console.log(currentPage + " " + currentPageDontExist);
    if (currentPageDontExist) this.setState({ currentPage: currentPage - 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelecte = genre => {
    console.log(genre);
    this.setState({ selectedGenres: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies, currentPage, pageSize } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filteredMovies = this.state.selectedGenres
      ? movies.filter(m => m.genre._id === this.state.selectedGenres)
      : movies;
    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-md-3">
          <ListGroup
            items={this.state.genres}
            selectedGenres={this.state.selectedGenres}
            onItemSelect={this.handleGenreSelecte}
          />
        </div>
        <div className="col-md-9">
          <p className="text-center m-3">
            Showing {filteredMovies.length} movies in the database.
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paginatedMovies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
