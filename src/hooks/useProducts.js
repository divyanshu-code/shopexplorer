import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllProducts } from '../services/api.js';

const INITIAL_STATE = {
  products: [],
  loading: true,
  error: null,
};

const useProducts = () => {
  const [products, setProducts] = useState(INITIAL_STATE.products);
  const [loading, setLoading]   = useState(INITIAL_STATE.loading);
  const [error, setError]       = useState(INITIAL_STATE.error);
  const [fetchIndex, setFetchIndex] = useState(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllProducts();
        if (isMountedRef.current) {
          setProducts(data);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError({
            status: err.status,
            message: err.message ?? 'Failed to fetch products.',
          });
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [fetchIndex]);

  const refetch = useCallback(() => setFetchIndex((prev) => prev + 1), []);

  return { products, loading, error, refetch };
};

export default useProducts;
