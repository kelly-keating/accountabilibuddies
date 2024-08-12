import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'

interface Props {
  closeModal: () => void
  openAddRatings: () => void
}

function RatingsPopup({ closeModal, openAddRatings }: Props) {
  const theySaidYes = () => {
    openAddRatings()
    closeModal()
  }

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome!</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Your first task as an accountabilibuddy is to enter a few things you
            want to keep yourself checking in on when we meet each week.
          </Text>
          <Text mt="15px">
            It&apos;ll be a fist of five rating of however you feel with each
            value/goal/activity so feel free to make them whatever suits you.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr="10px" onClick={closeModal}>
            Just show me the page
          </Button>
          <Button colorScheme="teal" onClick={theySaidYes}>
            Let me add some!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RatingsPopup
