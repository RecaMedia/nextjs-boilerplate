import React from 'react';
import Pagination from "react-js-pagination";

export default class UserGallery extends React.Component {

	constructor(props) {
		super(props);

		this.processPages = this.processPages.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);

		this.state = {
			list_count: 20,
			list: (this.props.list ? this.props.list : []),
			displayList: [],
			currentPage: 1,
			postCall: false
		}
	}

	componentDidMount() {
    this.setState({
      displayList: this.processPages(this.state.list, this.state.currentPage)
    });
	}

	processPages(list, current_page) {
		let end_index = current_page * this.state.list_count;
		let start_index = end_index - this.state.list_count;
		return list.slice(start_index, end_index);
	}

	handlePageChange(go_to_page) {
		this.setState({
			displayList: this.processPages(this.state.list, go_to_page),
			currentPage: go_to_page,
		});
	}

	render() {
		let posts = <div>
			<ul className="gallery">
        {this.state.displayList.map((item,i) => {
          return <li key={i} className="gallery__slot">
          </li>
        })}
      </ul>
			<div className="gallery-pagination">
				<Pagination
					activePage={this.state.currentPage}
					itemsCountPerPage={Number(this.state.values.list_count)}
					totalItemsCount={this.state.list.length}
					pageRangeDisplayed={5}
					onChange={this.handlePageChange.bind(this)}
				/>
			</div>
		</div>

		return <div className="gallery-container">
			{(this.state.list.length ? posts : null)}
		</div>;
	}
}