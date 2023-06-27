import { useEffect } from "react";
import { AddExpense } from "../components/AdminComponents/AddExpense";
import { useAdminContext } from "../components/AdminComponents/AdminContext";
import { Divider } from "../components/Divider";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";
import { ArrowLeftIcon } from "../components/Icons/ArrowLeftIcon";

const EditExpense = () => {
  const {
    state: { isAdmin },
  } = useUserContext();

  const {
    state: { selectedExpense },
  } = useAdminContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/mybudget");
    }
  }, [isAdmin, navigate]);
  return (
    <div>
      <Button priority="outline" iconLeft onClick={() => navigate(-1)}>
        <ArrowLeftIcon /> Back
      </Button>
      <Divider spacing="s" />
      <AddExpense reqType="update" expense={selectedExpense} />
    </div>
  );
};

export default EditExpense;
