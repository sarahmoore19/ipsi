import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import * as productActions from '../../store/product'
import ProductCard from "../ProductCard";
import OpenModalButton from "../OpenModalButton";

function DeleteModal({id}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  return (
  <div>
    delete
  </div>
  );
}

export default DeleteModal;
