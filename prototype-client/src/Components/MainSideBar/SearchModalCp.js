import React, { useEffect, useState, forwardRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import searchFilter from "../../utils/SearchFilter";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ModalOpenAtom from "../../store/ModalOpenAtom";

const SearchModalCp = forwardRef((props, ref) => {
  const setSearchModalOpen = useSetRecoilState(ModalOpenAtom("searchModal"));
  const getAllUser = async () => {
    try {
      return await axios.get(`/page/all-user-info`);
    } catch (error) {
      console.error(error);
    }
  };

  const { data: allUser } = useQuery({
    queryKey: ["allUser"],
    queryFn: getAllUser,
  });

  const [searchInput, setSearchInput] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [noSearch, setNoSearch] = useState(true);

  useEffect(() => {
    if (allUser?.data && searchInput) {
      const users = searchFilter(allUser?.data, searchInput);
      setSearchedUsers([...users]);
      console.log(allUser.data, "allUser allUser");
    }
    if (!searchInput) {
      setNoSearch(true);
    }
  }, [searchInput, allUser?.data]);

  useEffect(() => {
    if (searchedUsers.length > 0) setNoSearch(false);
  }, [searchedUsers]);

  return (
    <SearchDiv ref={ref}>
      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <UserList>
        {(noSearch ? [] : searchedUsers)?.map((user) => (
          <UserProfileLink
            to={`/dashboard/profile/${user.nickname}/${user.id}`}
            key={user.id}
          >
            <User onClick={() => setSearchModalOpen(false)}>
              <UserProfileImg src={user?.profileImg} />
              <UserNickname>{user?.nickname}</UserNickname>
            </User>
          </UserProfileLink>
        ))}
      </UserList>
    </SearchDiv>
  );
});

export default SearchModalCp;
const UserProfileLink = styled(Link)`
  text-decoration: none;
`;

const SearchDiv = styled.div`
  position: absolute;
  width: 300px;
  height: 400px;
  top: 50px;
  z-index: 10;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

const SearchInput = styled.input`
  width: 95%;
  height: 45px;
  background-color: #efefef;
  border-radius: 5px;
  border: none;
  margin-top: 15px;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
`;
const UserList = styled.div`
  width: 95%;
  height: 80%;
  margin-top: 5px;
  background-color: white;
  overflow: auto;
`;

const User = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  border: none;
  &:hover {
    background-color: #eeeded;
    border-radius: 5px;
  }
  margin-bottom: 5px;
  cursor: pointer;
`;

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-left: 10px;
  margin-right: 10px;
  object-fit: cover;
`;

const UserNickname = styled.div`
  text-decoration: none;
  color: black;
`;

const UserProfileIdddmg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-left: 10px;
  margin-right: 10px;
  object-fit: cover;
`;

const UsedddrNickname = styled.div``;
