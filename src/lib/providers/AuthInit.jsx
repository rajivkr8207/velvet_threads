"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "@/lib/features/auth/auth.thunk";

export default function AuthInit({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return children;
}
