import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import ApiPixbay from '../../services/api_pixabay';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    error: '',
  };

  componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getDataFromPixbay(query, page);
    }
  };

  getDataFromPixbay = async (query, page) => {
    this.setState({ loading: true });
    try {
      const getImage = await ApiPixbay.fetchPixbay(query, page);
      const requiredData = getImage.hits;

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...requiredData],
        };
      });

      if (requiredData.length === 0) {
        toast.info(`There are no images of ${query}, try some else`, {
          duration: 4000,
          position: 'top-right',
          icon: '🙀',
          theme: 'colored',
        });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    } finally {
      this.setState({ loading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  render() {
    const { images } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {images.length > 0 && !this.state.loading && (
          <Button onClick={this.onLoadMore} />
        )}
        {this.state.loading && <Loader />}
        <ToastContainer />
      </Container>
    );
  }
}

// *Alternative....
// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     error: '',
//     status: 'idle',
//     message: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query) {
//       this.setState({ page: 1 });
//       this.setState({ status: 'pending' });
//       this.getDataFromPixbay();
//     }
//     if (prevState.page !== page) {
//       this.getDataFromPixbay();
//     }
//   }

//   getDataFromPixbay = () => {
//     const { query, page } = this.state;

//     ApiPixbay.fetchPixbay(query, page)
//       .then(images => {
//         return this.setState(prevState => ({
//           images: [...prevState.images, ...images.hits],
//           status: 'resolved',
//         }));
//       })
//       .catch(error =>
//         this.setState({
//           error,
//           status: 'rejected',
//         })
//       );
//   };

//   errorMessage = () => {
//     const { images, query } = this.state;
//     if (images.length === 0) {
//       this.setState({ status: 'resolved' });
//       toast(`There are no images of ${query}, try some else`, {
//         duration: 4000,
//         position: 'top-right',
//         icon: '🙀',
//       });
//     }
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleFormSubmit = query => {
//     this.setState({ query, images: [], page: 1, status: 'resolved' });
//   };

//   render() {
//     const { images, status } = this.state;
//     if (status === 'idle') {
//       return <Searchbar onSubmit={this.handleFormSubmit} />;
//     }

//     if (status === 'pending') {
//       return (
//         <>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <Loader />
//         </>
//       );
//     }

//     if (status === 'rejected') {
//       return (
//         <>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//         </>
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <Searchbar
//             onSubmit={this.handleFormSubmit}
//             emptyMessage={this.errorMessage}
//           />
//           <ImageGallery images={images} />
//           {images.length > 0 && <Button onClick={this.onLoadMore} />}
//           {images.length === 0 && <Toaster errorMessage={this.errorMessage} />}
//         </>
//       );
//     }
//   }
// }
