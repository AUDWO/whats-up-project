import React from "react";
/*
import {
  FollowCountWrapper,
  FollowerWrapper,
  FollowerTitle,
  FollowerCountNumber,
  FollowingWrapper,
  FollowingTitle,
  FolloiwngCountNumber,
  FollowButton,
} from "../../StyledComponents/ProfileStyle/ProfileInfoCpSt";*/

import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomUseMutation from "../../customHooks/CustomUseMutation";

import SpinnerCp from "../Common/Spinner/SpinnerCp";

const ProfileFollowCp = ({ otherUserInfoId }) => {
  const getFollowInfo = async () => {
    try {
      return await axios.get(`/user/follow-info/${otherUserInfoId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: followInfo,
    isLoading: followInfoLoading,
    isSuccess: followInfoIsSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["followInfo"],
    queryFn: getFollowInfo,
  });

  const postFollowing = async () => {
    try {
      await axios.post(`/user/${otherUserInfoId}/follow`);
    } catch (error) {
      console.error(error);
    }
  };

  const postUnFollowing = async () => {
    try {
      await axios.post(`/user/${otherUserInfoId}/unfollow`);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: handleFollowing, isPending: followingLoading } =
    CustomUseMutation(postFollowing, ["followInfo"]);

  const { mutate: handleUnFollowing, isPending: unFollowingLoading } =
    CustomUseMutation(postUnFollowing, ["followInfo"]);

  if (
    followInfoLoading ||
    isFetching ||
    followingLoading ||
    unFollowingLoading
  ) {
    return (
      <ProfileFollowWrapper>
        <FollowLoadingButton>
          <SpinnerCp color="#ffffff" size="15px" />
        </FollowLoadingButton>
        <FollowCountWrapper>
          <FollowerWrapper>
            <FollowerTitle>팔로워</FollowerTitle>
            <FollowerCountNumber>
              <SpinnerCp color="#000000" size="15px" />
            </FollowerCountNumber>
          </FollowerWrapper>
          <FollowingWrapper>
            <FollowingTitle>팔로우</FollowingTitle>
            <FolloiwngCountNumber>
              <SpinnerCp color="#000000" size="15px" />
            </FolloiwngCountNumber>
          </FollowingWrapper>
        </FollowCountWrapper>
      </ProfileFollowWrapper>
    );
  }

  if (followInfoIsSuccess) {
    console.log("가장 기본");
    return (
      <ProfileFollowWrapper>
        {followInfo.data.checkFollower ? (
          <UnFollowButton
            onClick={() => {
              handleUnFollowing();
            }}
          >
            팔로우 취소
          </UnFollowButton>
        ) : (
          <FollowButton
            onClick={() => {
              handleFollowing();
            }}
          >
            팔로우
          </FollowButton>
        )}
        <FollowCountWrapper>
          <FollowerWrapper>
            <FollowerTitle>팔로워</FollowerTitle>
            <FollowerCountNumber>
              {followInfo.data.follower}
            </FollowerCountNumber>
          </FollowerWrapper>
          <FollowingWrapper>
            <FollowingTitle>팔로우</FollowingTitle>
            <FolloiwngCountNumber>
              {followInfo.data.following}
            </FolloiwngCountNumber>
          </FollowingWrapper>
        </FollowCountWrapper>
      </ProfileFollowWrapper>
    );
  }
};

const ProfileFollowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
export default ProfileFollowCp;

export const FollowCountWrapper = styled.div`
  height: auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;
export const FollowerWrapper = styled.span`
  margin-right: 40px;
`;

export const FollowerTitle = styled.span`
  font-size: 15px;
`;

export const FollowerCountNumber = styled.span`
  font-weight: 600;
  margin-left: 5px;
`;

export const FolloiwngCountNumber = styled.span`
  margin-left: 5px;
  font-weight: 600;
`;

export const FollowingWrapper = styled.span``;

export const PostsInfoWrapper = styled.div`
  border-top: 0.5px solid #dbdbdb;
  display: flex;
  justify-content: center;
`;

export const FollowingTitle = styled.span`
  font-size: 15px;
`;

export const FollowButton = styled.span`
  font-size: 15px;
  border-radius: 7px;
  background-color: #f7dd07;
  width: 70px;
  color: white;
  padding: 7px 15px;
  cursor: pointer;
`;

export const UnFollowButton = styled.span`
  font-size: 15px;
  border-radius: 7px;
  background-color: #f7dd07;
  color: white;
  width: 100px;
  padding: 7px 15px;
  cursor: pointer;
`;

export const FollowLoadingButton = styled.span`
  font-size: 15px;
  border-radius: 7px;
  background-color: #f7dd07;
  width: 70px;
  height: 32px;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
