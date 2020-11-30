import {useEffect, useState} from 'react';

export default function useId (idOverride) {
  const [defaultId, setDefaultId] = useState (idOverride);
  const id = idOverride || defaultId;
  useEffect (
    () => {
      if (defaultId == null) {
        setDefaultId (`dcui-${Math.round (Math.random () * 1e5)}`);
      }
    },
    [defaultId]
  );
  return id;
}
