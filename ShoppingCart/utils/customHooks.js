import { useState, useEffect, useRef } from 'react'

export const useComponentWillMount = (fn) => {
      const firstLoad = useRef(true);

      if (firstLoad.current) {
          fn();
      }

      firstLoad.current = false;
};

export const useComponentWillUpdate = (fn) => {
    const firstLoad = useRef(true);

    useEffect(() => {
        if (!firstLoad.current) {
            fn();
        }

        firstLoad.current = false;
    });
};

export const usePrevious = (currentValue) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = currentValue;
    });

    return ref.current;
};

export const useForceUpdate = (value) => {
    const [, setState] = useState();
    const firstTimeLoad = useRef(true);

    useEffect(() => {
        if (!firstTimeLoad) {
            return setState({});
        }
    }, [value]);

    firstTimeLoad.current = false;
};