import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { fetchPixabay } from '../../services/api_pixabay';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';

// const status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        await fetchPixabay(query, page).then(response => {
          setImages(prevImages => [...prevImages, ...response.hits]);
          setLoading(false);
          if (response.totalHits === 0) {
            toast.info(`There are no images of ${query}, try some else`, {
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              position: 'top-right',
              icon: '🙀',
              theme: 'colored',
            });
          }
        });
      } catch (error) {
        console.warn('Something went wrong');
      }
    };

    if (query) {
      getImages();
      setLoading(true);
    }
  }, [page, query]);

  function onLoadMore() {
    return setPage(prevState => prevState + 1);
  }

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {images.length > 0 && !loading && <Button onClick={onLoadMore} />}
      {loading && <Loader />}
      <ToastContainer />
    </Container>
  );
};

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
