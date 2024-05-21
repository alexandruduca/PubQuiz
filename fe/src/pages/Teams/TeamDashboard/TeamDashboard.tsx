import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentTeam, selectCurrentTeamId, selectLoading, selectMyTeam } from '../selectors';
import { Button, Menu, MenuItem, Theme, Typography } from '@mui/material';
import {
  deleteTeamTrigger,
  getTeamByIdTrigger,
  joinTeamRequestTrigger,
  kickMemberTrigger,
  leaveTeamTrigger,
  updateJoinRequestTrigger,
  updateLeaderTrigger,
} from '../teamsSlice';
import { SelectedUser, TeamModalActions, TeamWithStatistics } from '../../../types/teams';
import { selectCredentials, selectId } from '../../Login/selectors';
import ActionModal from '../../../components/ActionModal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    border: `5px groove ${theme.palette.primary.main}`,
    width: '100%',
    margin: '50px 0',
    h6: { marginBottom: '10px' },
    [theme.breakpoints.down(1100)]: {
      width: 'calc(100% - 60px)',
      margin: '50px 30px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  membersContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '50px',
    [theme.breakpoints.down(1100)]: {
      flexDirection: 'column',
      gap: '30px',
    },
  },
  membersButtonsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 120px)',
    justifyContent: 'center',
    paddingLeft: '120px',
    columnGap: '5px',
  },
  membersList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto)',
    justifyContent: 'center',
  },
  joinRequestsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    justifyContent: 'center',
    gap: '10px',
  },
  textFontSize: {
    fontSize: '20px',
  },
  statisticsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '50px',
    [theme.breakpoints.down(1100)]: {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '30px',
    },
  },
  generalStatistics: {
    margin: '0 25px',
  },
  statistics: {
    margin: '0 25px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    gap: '30px',
    marginBottom: '20px',
  },
  manageButton: {
    '& .MuiButton-startIcon': { margin: '0px' },
    minWidth: '0px',
    padding: '0px',
  },
  separator: {
    display: 'block',
    height: '1px',
    border: '0',
    borderTop: '1px solid #ccc',
    margin: '25px 5%',
    padding: '0',
    width: '90%',
    justifyContent: 'center',
  },
}));

const TeamDashboard = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<TeamModalActions | null>(null);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({ id: '', username: '' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const currentTeamId = useAppSelector(selectCurrentTeamId);
  const currentTeam: TeamWithStatistics = useAppSelector(selectCurrentTeam);
  const myTeam = useAppSelector(selectMyTeam);
  const { username } = useAppSelector(selectCredentials);
  const id = useAppSelector(selectId);
  const loading = useAppSelector(selectLoading);
  const { classes } = useStyles();
  const { t } = useTranslation('teams');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, user: SelectedUser) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const modalProps = {
    [TeamModalActions.deleteTeam]: {
      action: () => dispatch(deleteTeamTrigger({ teamId: currentTeamId, id })),
      title: t('deleteTeam.title'),
      content: t('deleteTeam.content', { teamName: myTeam?.name }),
      actionName: t('deleteTeam.actionName'),
    },
    [TeamModalActions.leaveTeam]: {
      action: () => dispatch(leaveTeamTrigger({ teamId: currentTeamId, id, username })),
      title: t('leaveTeam.title'),
      content: t('leaveTeam.content', { teamName: myTeam?.name }),
      actionName: t('leaveTeam.actionName'),
    },
    [TeamModalActions.kickMember]: {
      action: () => dispatch(kickMemberTrigger({ teamId: currentTeamId, ...selectedUser })),
      title: t('kickMember.title'),
      content: t('kickMember.content', { username: selectedUser.username }),
      actionName: t('kickMember.actionName'),
    },
    [TeamModalActions.assignLeader]: {
      action: () => dispatch(updateLeaderTrigger({ teamId: currentTeamId, ...selectedUser })),
      title: t('assignLeader.title'),
      content: t('assignLeader.content', { username: selectedUser.username }),
      actionName: t('assignLeader.actionName'),
    },
    [TeamModalActions.acceptMember]: {
      action: () =>
        dispatch(
          updateJoinRequestTrigger({ teamId: currentTeamId, ...selectedUser, isAccepted: true })
        ),
      title: t('acceptMember.title'),
      content: t('acceptMember.content', { username: selectedUser.username }),
      actionName: t('acceptMember.actionName'),
    },
    [TeamModalActions.declineMember]: {
      action: () =>
        dispatch(
          updateJoinRequestTrigger({ teamId: currentTeamId, ...selectedUser, isAccepted: false })
        ),
      title: t('declineMember.title'),
      content: t('declineMember.content', { username: selectedUser.username }),
      actionName: t('declineMember.actionName'),
    },
  };

  const openModal = (action: TeamModalActions, user?: SelectedUser) => {
    setModalOpen(true);
    setModalAction(action);
    if (user) {
      setSelectedUser(user);
    }
  };

  const isCurrentLeader = currentTeam && currentTeam.leader._id === id;

  const isMember = currentTeam && currentTeam.members.findIndex(({ _id }) => _id === id) !== -1;

  const hasTeam = Boolean(myTeam);

  useEffect(() => {
    if (currentTeamId) {
      dispatch(getTeamByIdTrigger(currentTeamId));
    }
  }, [dispatch, currentTeamId]);

  return (
    currentTeam &&
    !loading && (
      <div className={classes.container}>
        <Typography variant="h4" align="center" marginTop={'20px'}>
          {currentTeam.name}
        </Typography>
        <div className={classes.membersContainer}>
          <div>
            <Typography variant="h5" marginBottom={'15px'} align="center">
              {t('members')}
            </Typography>
            <div
              className={clsx(
                { [classes.membersButtonsContainer]: isCurrentLeader },
                { [classes.membersList]: !isCurrentLeader }
              )}
            >
              {currentTeam.members.map(({ _id, username }, index) => (
                <>
                  <Typography className={classes.textFontSize}>
                    {index + 1 + `. ` + username}
                  </Typography>
                  {id !== _id && isCurrentLeader ? (
                    <div>
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={(event) => handleClick(event, { id: _id, username })}
                        startIcon={<ExpandMoreIcon />}
                        className={classes.manageButton}
                      ></Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            openModal(TeamModalActions.kickMember);
                            handleClose();
                          }}
                        >
                          {t('buttons.kickMember')}
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            openModal(TeamModalActions.assignLeader);
                            handleClose();
                          }}
                        >
                          {t('buttons.leader')}
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
              ))}
            </div>
          </div>
          {isCurrentLeader && currentTeam.joinRequests.length > 0 && (
            <div>
              <Typography variant="h5" marginBottom={'15px'} align="center">
                {t('joinRequests')}
              </Typography>
              <div className={classes.joinRequestsContainer}>
                {currentTeam.joinRequests.map(({ _id, username }, index) => (
                  <>
                    <Typography className={classes.textFontSize}>
                      {index + 1 + `. ` + username}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        openModal(TeamModalActions.acceptMember, { id: _id, username })
                      }
                    >
                      {t('buttons.accept')}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        openModal(TeamModalActions.declineMember, { id: _id, username })
                      }
                    >
                      {t('buttons.decline')}
                    </Button>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
        <hr className={classes.separator} />
        <div className={classes.statisticsContainer}>
          <div className={classes.generalStatistics}>
            <Typography variant="h5" marginBottom={'15px'}>
              {t('statistics.generalTitle')}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.bestConnectionTeam', {
                teamName: currentTeam.statistics.bestConnectionTeam.teamName,
                points: currentTeam.statistics.bestConnectionTeam.points,
              })}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.bestJokerTeam', {
                teamName: currentTeam.statistics.bestJokerTeam.teamName,
                points: currentTeam.statistics.bestJokerTeam.points,
              })}
            </Typography>
            <Typography variant="h5" margin={'15px 0'}>
              {t('statistics.leaderboard.title')}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.leaderboard.first', {
                teamName: currentTeam.statistics.leaderboard.firstTeamName,
              })}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.leaderboard.second', {
                teamName: currentTeam.statistics.leaderboard.secondTeamName,
              })}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.leaderboard.third', {
                teamName: currentTeam.statistics.leaderboard.thirdTeamName,
              })}
            </Typography>
          </div>
          <div className={classes.statistics}>
            <Typography variant="h5" marginBottom={'15px'}>
              {t('statistics.title')}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.firstPlace', { places: currentTeam.statistics.firstPlace })}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.secondPlace', { places: currentTeam.statistics.secondPlace })}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.thirdPlace', { places: currentTeam.statistics.thirdPlace })}
            </Typography>
            <Typography className={classes.textFontSize}>
              {t('statistics.averagePlace', { places: currentTeam.statistics.averagePlace })}
            </Typography>
          </div>
        </div>
        <div className={classes.buttonsContainer}>
          {!isMember && !hasTeam && (
            <Button
              variant="contained"
              onClick={() =>
                dispatch(joinTeamRequestTrigger({ teamId: currentTeamId, id, username }))
              }
            >
              {t('buttons.joinTeam')}
            </Button>
          )}
          {isCurrentLeader && (
            <Button
              variant="contained"
              onClick={() => openModal(TeamModalActions.deleteTeam, { id, username })}
            >
              {t('buttons.deleteTeam')}
            </Button>
          )}
          {isMember && !isCurrentLeader && (
            <Button
              variant="contained"
              onClick={() => openModal(TeamModalActions.leaveTeam, { id, username })}
            >
              {t('buttons.leaveTeam')}
            </Button>
          )}
        </div>
        <ActionModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          {...modalProps[modalAction as TeamModalActions]}
        />
      </div>
    )
  );
};

export default TeamDashboard;
