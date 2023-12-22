import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";

//Styled-Components
import {
  ProfileConfigModalWrapper,
  ProfileConfigWrapper,
  ProfileConfigListItem,
  ConfigTitleWrapper,
  ConfigTitle,
} from "../../StyledComponents/ProfileStyle/ProfileContentConfig/ProfileContentConfigModalCpSt";

//Components
import PostContentConfigOptionCp from "./ProfileContentConfig/PostContentConfigOptionCp";
import DiaryContentConfigOptionCp from "./ProfileContentConfig/DiaryContentConfigOptionCp";

//Atoms
import contentInfoAtom from "../../store/contentInfo/diaryContentInfoAtom";
import ModalOpenAtom from "../../store/ModalOpenAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProfileContentConfigModalCp = () => {
  const profileContentConfigModalBackground = useRef();
  const setContentConfigModalOpen = useSetRecoilState(
    ModalOpenAtom("profileContentConfigModal")
  );

  const [diaryInfoOpen, setDiaryInfoOpen] = useState(false);
  const [postInfoOpen, setPostInfoOpen] = useState(false);

  const contentInfo = useRecoilValue(contentInfoAtom);

  useEffect(() => {
    if (contentInfo.type === "diary") {
      setDiaryInfoOpen(true);
    }

    if (contentInfo.type === "post") {
      setPostInfoOpen(true);
    }
  }, []);

  const deletePost = async () => {
    try {
      const response = await axios.delete(`/delete/post/${contentInfo.id}`);
      console.log(response, "deletePostResponse-1-1-01--010-10-1");
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDiary = async () => {
    try {
      return await axios.delete(`/delete/diary/${contentInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const queryClient = useQueryClient();

  const { mutate: postMutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["postContentsInfo"] });
      setContentConfigModalOpen(false);
    },
    onError: (error) => {
      console.log("onErro postMutate", error);
    },
  });

  const { mutate: diaryMutate } = useMutation({
    mutationFn: deleteDiary,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["diaryContentsInfo"] });
      setContentConfigModalOpen(false);
    },
    onError: (error) => {
      console.log("onErrorData diaryMutate", error);
    },
  });

  const handleDelete = async () => {
    console.log("handleDelete");
    try {
      if (diaryInfoOpen) {
        diaryMutate();
      }

      if (postInfoOpen) {
        postMutate();
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  if (diaryInfoOpen || postInfoOpen) {
    return (
      <ProfileConfigModalWrapper
        ref={profileContentConfigModalBackground}
        onClick={(e) => {
          if (e.target === profileContentConfigModalBackground.current) {
            setContentConfigModalOpen(false);
          }
        }}
      >
        <ProfileConfigWrapper>
          <ProfileConfigListItem>
            <ConfigTitleWrapper>
              <ConfigTitle>
                {diaryInfoOpen && "일기 정보 변경"}
                {postInfoOpen && "게시물 정보 변경"}
              </ConfigTitle>
            </ConfigTitleWrapper>
            {diaryInfoOpen && (
              <DiaryContentConfigOptionCp contentInfo={contentInfo} />
            )}
            {postInfoOpen && (
              <PostContentConfigOptionCp contentInfo={contentInfo} />
            )}
          </ProfileConfigListItem>
          <ProfileConfigListItem>
            <ConfigTitleWrapper>
              <ConfigTitle
                color={"red"}
                onClick={() => {
                  handleDelete();
                }}
              >
                {diaryInfoOpen && "일기 삭제"}
                {postInfoOpen && "게시물 삭제"}
              </ConfigTitle>
            </ConfigTitleWrapper>
          </ProfileConfigListItem>
          <ProfileConfigListItem>
            <ConfigTitleWrapper
              onClick={() => {
                setContentConfigModalOpen(false);
              }}
            >
              <ConfigTitle>닫기</ConfigTitle>
            </ConfigTitleWrapper>
          </ProfileConfigListItem>
        </ProfileConfigWrapper>
      </ProfileConfigModalWrapper>
    );
  }
};

export default ProfileContentConfigModalCp;
