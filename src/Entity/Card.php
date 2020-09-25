<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CardRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=CardRepository::class)
 * @ApiResource(
 *  subresourceOperations={
 *      "api_boxes_cards_get_subresource"={
 *          "normalization_context"={"groups"={"cards_subresource"}}
 *      }
 *  },
 *  normalizationContext={"groups"={"cards_read"}},
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"box.title"})
 * @ApiFilter(DateFilter::class, properties={"nextAt"})
 * 
 */
class Card
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"cards_read", "boxes_read", "cards_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"cards_read", "boxes_read", "cards_subresource"})
     */
    private $recto;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"cards_read", "boxes_read", "cards_subresource"})
     */
    private $verso;

    /**
     * @ORM\Column(type="string", length=5)
     * @Assert\NotBlank
     * @Assert\Choice(choices={"recto", "verso"}, message="The face need to be 'recto' or 'verso'")
     * @Groups({"cards_read", "boxes_read", "cards_subresource"})
     */
    private $face;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank
     * @Assert\Range(min=1, max=7, invalidMessage="The value should be an integer between 1 and 7")
     * @Groups({"cards_read", "boxes_read", "cards_subresource"})
     */
    private $compartment;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank
     * @Assert\Type("\DateTimeInterface")
     * @Groups({"cards_read", "boxes_read", "cards_subresource"})
     */
    private $nextAt;

    /**
     * @ORM\ManyToOne(targetEntity=Box::class, inversedBy="cards")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"cards_read"})
     */
    private $box;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRecto(): ?string
    {
        return $this->recto;
    }

    public function setRecto(string $recto): self
    {
        $this->recto = $recto;

        return $this;
    }

    public function getVerso(): ?string
    {
        return $this->verso;
    }

    public function setVerso(string $verso): self
    {
        $this->verso = $verso;

        return $this;
    }

    public function getFace(): ?string
    {
        return $this->face;
    }

    public function setFace(string $face): self
    {
        $this->face = $face;

        return $this;
    }

    public function getCompartment(): ?int
    {
        return $this->compartment;
    }

    public function setCompartment($compartment): self
    {
        $this->compartment = $compartment;

        return $this;
    }

    public function getNextAt(): ?\DateTimeInterface
    {
        return $this->nextAt;
    }

    public function setNextAt(\DateTimeInterface $nextAt): self
    {
        $this->nextAt = $nextAt;

        return $this;
    }

    public function getBox(): ?Box
    {
        return $this->box;
    }

    public function setBox(?Box $box): self
    {
        $this->box = $box;

        return $this;
    }
}
