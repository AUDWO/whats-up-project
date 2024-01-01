import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Mm from "./Mm";
import searchFilter from "../../utils/SearchFilter";

const SearchModalCp = () => {
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
    const users = searchFilter(allUser.data, searchInput);
    setSearchedUsers([...users]);
    /*
    const filterdUsers = allUser?.data
      .filter((user) => ({
        ...user,
        nickname: user.nickname.replace(/[^a-zA-Z]/g, "").toLowerCase(),
      }))
      .sort((fst, snd) => {
        let filterdSearchInout = searchInput
          .replace(/[^a-zA-Z]/g, "")
          .toLowerCase();
        const fstIndex = fst.nickname.indexOf(filterdSearchInout);
        const sndIndex = snd.nickname.indexOf(filterdSearchInout);

        return fstIndex - sndIndex || fst.nickname.localeCompare(snd.nickname);
      });*/
    // if (filterdUsers) console.log(filterdUsers, "filteredUsers filteredUsers");
  }, [searchInput, allUser?.data]);

  useEffect(() => {
    if (searchedUsers.lengt > 0) setNoSearch(false);
  }, [searchedUsers]);

  return (
    <SearchDiv>
      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <UserList>
        {(noSearch ? [] : searchedUsers)?.data.map((user) => (
          <User>
            <UserProfileImg src={user?.profileImg} />
            <UserNickname>{user?.nickname}</UserNickname>
          </User>
        ))}
      </UserList>
    </SearchDiv>
  );
};

/*
 {(noSearch ? [] : filterdUsers)?.data.map((user) => (
          <User>
            <UserProfileImg src={user?.profileImg} />
            <UserNickname>{user?.nickname}</UserNickname>
          </User>
        ))}*/

export default SearchModalCp;

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

const UserNickname = styled.div``;

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
