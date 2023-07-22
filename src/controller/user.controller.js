import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ msg: "fetched data successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriendList = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriendList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await user.findById(id);
    const friend = await friend.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.friends.includes(friendId)) {
      await user.friends.pull(friendId);
      await friend.friends.pull(id);
    } else {
      await user.friends.push(friendId);
      await friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriendList = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriendList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
